class Api::AssignmentsController < ApplicationController
    before_action :set_assignment, only: [:update, :destroy, :complete]
    before_action :set_template, only: [:update_template, :destroy_template]
    respond_to :json

    def create
        authorize Assignment
        
        if params.fetch(:participant_ids).empty?
            render json: { error: 'Participant must be populated'}, status: :unprocessable_entity
            return
        end
        participant_ids_string = params.fetch(:participant_ids)
        participant_ids = participant_ids_string.split(/,/)

        created_assignments = []
        begin
            due_date = DateTime.parse(params.fetch(:due_date))
        rescue ArgumentError
            due_date = nil
        end 

        action_item = authorize ActionItem.new(action_item_params), :create?
        template_sentry_helper(action_item)
        action_item[:is_template] = false
        
        if !participant_ids.empty? && action_item.save
            prepare_bulk_assignment(participant_ids, action_item, due_date).each do |assignment|
                assignment_sentry_helper(assignment)  
                if assignment.save
                    AssignmentMailer.with(assignment: assignment, action_item: action_item).new_assignment.deliver_now
                    created_assignments.append(assignment)
                else 
                    action_item.destroy
                    Raven.capture_message("Could not create assignment")
                    render json: { error: 'Could not create assignment' }, status: :unprocessable_entity
                    return
                end
            end
        else
            Raven.capture_message("Could not create assignment")
            render json: { error: 'Could not create assignment' }, status: :unprocessable_entity
            return
        end
    render json: created_assignments, status: :created 
    end  

    def update
        authorize @assignment
        action_item_copied = false
        action_item = @assignment.action_item

        if !action_item_params.empty? && action_item.assignments.length > 1
            action_item = action_item.dup
            action_item_copied = true
        end
        
        @assignment.assign_attributes(assignment_params)
        action_item.assign_attributes(action_item_params)

        if (action_item.valid? && @assignment.valid?) && (action_item.save && @assignment.save)
            if action_item_copied
                @assignment.update(action_item: action_item)
            end
            render json: @assignment, status: :ok
        else
            Raven.capture_message("Could not update assignment")
            render json: { error: 'Could not update assignment' }, status: :unprocessable_entity
        end
    end

    def destroy
        authorize @assignment
        action_item = @assignment.action_item
        if @assignment.destroy
            if action_item.assignments.empty?
                action_item.destroy
            end
            render json: {}, status: :ok
        else
            Raven.capture_message("Failed to delete assignment")
            render json: { error: 'Failed to delete assignment' }, status: :unprocessable_entity
        end
    end

    def create_template
        @template = authorize ActionItem.new(action_item_params), :create?
        template_sentry_helper(@template)
        @template[:is_template] = true

        if @template.save
            render json: @template, status: :created
        else
            Raven.capture_message("Could not create template")
            render json: { error: 'Could not create template' }, status: :unprocessable_entity
        end
    end

    def update_template
        authorize @template, :update?
        if @template.update(action_item_params)
            render json: @template, status: :ok
        else
            Raven.capture_message("Could not update assignment template")
            render json: { error: 'Could not update assignment template' }, status: :unprocessable_entity
        end
    end

    def destroy_template
        authorize @template, :destroy?
        if @template.is_template && @template.destroy
            render json: @template, status: :ok
        else
            Raven.capture_message("Failed to delete assignment template. Assignment must be a template.")
            render json: { error: 'Failed to delete assignment template. Assignment must be a template.' }, status: :unprocessable_entity
        end
    end

    def complete
        authorize @assignment
        if current_user.user_type === 'staff'
            if @assignment.update(completed_staff: true)
                render json: @assignment, status: :ok
            else
                Raven.capture_message("Failed to mark as completed by participant")
                render json: { error: 'Failed to mark as completed by participant' }, status: :unprocessable_entity
            end
        end

        if current_user.user_type === 'participant'
            if @assignment.update(completed_participant: true)
                render json: @assignment, status: :ok
            else
                Raven.capture_message("Failed to mark as completed by participant")
                render json: { error: 'Failed to mark as completed by participant' }, status: :unprocessable_entity
            end
        end
    end

    private
    
    def set_template
        @template = ActionItem.find(params[:id])
        template_sentry_helper(@template)
    rescue ActiveRecord::RecordNotFound => exception
        Raven.extra_context(action_item_id: params[:id])
        Raven.capture_exception(exception)
        render json: { error: 'Could not find assignment template' }, status: :not_found
    end

    def template_sentry_helper(action_item)
        Raven.extra_context(action_item: action_item.attributes)
    end

    def set_assignment
        @assignment = Assignment.find(params[:id])
        assignment_sentry_helper(@assignment)
    rescue ActiveRecord::RecordNotFound => exception
        Raven.extra_context(assignment_id: params[:id])
        Raven.capture_exception(exception)
        render json: { error: 'Could not find assignment' }, status: :not_found
    end

    def assignment_sentry_helper(assignment)
        Raven.extra_context(assignment: assignment.attributes)
        Raven.extra_context(action_item: assignment.action_item.attributes)
        Raven.extra_context(staff: assignment.staff.user.attributes)
        Raven.extra_context(participant: assignment.participant.user.attributes)
    end

    def file_absent?(file)
        file.eql?("null") || file.eql?("undefined") || !file.present?
    end

    def get_file_blob_from_fileURL(fileURL)
        action_item = ActionItem.all.select{|action_item| action_item.fileURL === fileURL}.first
        return action_item.present? ? action_item.file.blob : nil
    end

    def action_item_params
        action_item_param = params.permit(:title,
                                          :description,
                                          :category,
                                          :file)

        if file_absent?(action_item_param[:file]) and params[:fileURL].present?
            action_item_param[:file] = get_file_blob_from_fileURL(params[:fileURL])
        end

        if file_absent?(action_item_param[:file])
            action_item_param = action_item_param.except(:file)
        end

        return action_item_param
    end

    def assignment_params
        assignment_param = params.permit(:action_item_id,
                                        :due_date,
                                        :completed_participant,
                                        :completed_staff)
        assignment_param.merge(staff_id: current_user.staff.id)
    end

    def prepare_bulk_assignment(participant_ids, action_item, due_date)
        bulk_assignment_params = []
        single_assignment_params = {
                                    action_item_id: action_item.id,
                                    staff_id: current_user.staff.id,
                                    due_date: due_date,
                                    completed_participant: false,
                                    completed_staff: false,
                                   }
        participant_ids.each do |id|
            assignment = Assignment.new(single_assignment_params.merge(participant_id: id))
            bulk_assignment_params.append(assignment)
        end
        return bulk_assignment_params
    end
end