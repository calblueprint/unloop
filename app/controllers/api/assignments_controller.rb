class Api::AssignmentsController < ApplicationController
    before_action :set_assignment, only: [:show, :update, :destroy]
    before_action :set_template, only: [:show_template, :update_template, :destroy_template]
    respond_to :json

    def create
        created_assignments = []
        created_action_items = []
        assigned_to_ids = bulk_assignment_params.fetch(:assigned_to_ids, [])
        bulk_assignment_params.fetch(:assignments, []).each do |action_item|
            action_item = authorize ActionItem.new(action_item.except(:due_date))
            template_sentry_helper(action_item)
            action_item[:is_template] = false
            if !assigned_to_ids.empty? && action_item.save
                created_action_items.append(action_item)
                prepare_bulk_assignment(assigned_to_ids, action_item).each do |assignment|
                    assignment_sentry_helper(assignment)  
                    if assignment.save
                        created_assignments.append(assignment)
                    else 
                        action_item.destroy
                        created_action_items.each {|item| item.destroy}
                        Raven.capture_message("Could not create action item")
                        render json: { error: 'Could not create action item' }, status: :unprocessable_entity
                        return
                    end
                end
            else
                created_action_items.each {|item| item.destroy}
                Raven.capture_message("Could not create action item")
                render json: { error: 'Could not create action item' }, status: :unprocessable_entity
                return
            end
        end
        render json: created_assignments, status: :created
    end 

    def show
        authorize @assignment 
        render json: @assignment, status: :ok
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
            Raven.capture_message("Could not update action item")
            render json: { error: 'Could not update action item' }, status: :unprocessable_entity
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
            Raven.capture_message("Failed to delete action item")
            render json: { error: 'Failed to delete action item' }, status: :unprocessable_entity
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

    def get_templates
        @action_items = authorize ActionItem.where(is_template: true), :show?
        render json: @action_items, status: :ok
    end

    def show_template
        authorize @template, :show?
        render json: @template, status: :ok
    end

    def update_template
        authorize @template, :update?
        if @template.update(action_item_params)
            render json: @template, status: :ok
        else
            Raven.capture_message("Could not update template")
            render json: { error: 'Could not update template' }, status: :unprocessable_entity
        end
    end

    def destroy_template
        authorize @template, :destroy?
        if @template.is_template && @template.destroy
            render json: @template, status: :ok
        else
            Raven.capture_message("Failed to delete action item template. Action item must be a template.")
            render json: { error: 'Failed to delete action item template. Action item must be a template.' }, status: :unprocessable_entity
        end
    end

    private
    
    def set_template
        @template = ActionItem.find(params[:id])
        template_sentry_helper(@template)
    rescue ActiveRecord::RecordNotFound => exception
        Raven.extra_context(action_item_id: params[:id])
        Raven.capture_exception(exception)
        render json: { error: 'Could not find Action Item Template' }, status: :not_found
    end

    def template_sentry_helper(action_item)
        Raven.extra_context(case_note: action_item.attributes)
    end

    def set_assignment
        @assignment = Assignment.find(params[:id])
        assignment_sentry_helper(@assignment)
    rescue ActiveRecord::RecordNotFound => exception
        Raven.extra_context(assignment_id: params[:id])
        Raven.capture_exception(exception)
        render json: { error: 'Could not find Action Item' }, status: :not_found
    end

    def assignment_sentry_helper(assignment)
        Raven.extra_context(assignment: assignment.attributes)
        Raven.extra_context(action_item: assignment.action_item.attributes)
        Raven.extra_context(assigned_by: assignment.assigned_by.user.attributes)
        Raven.extra_context(assigned_to: assignment.assigned_to.user.attributes)
    end
          
    def prepare_bulk_assignment(assigned_to_ids, action_item)
        bulk_assignment_params = []
        single_assignment_params = {
                                    action_item_id: action_item.id,
                                    assigned_by_id: current_user.staff.id,
                                    due_date: action_item[:due_date],
                                    completed: false,
                                   }
        assigned_to_ids.each do |id|
            assignment = Assignment.new(single_assignment_params.merge(assigned_to_id: id))
            bulk_assignment_params.append(assignment)
        end
        return bulk_assignment_params
    end

    def action_item_params
        action_item_param = params.require(:assignment).permit(:title,
                                                               :description)
    end

    def bulk_assignment_params
        all_assignment_params = params.permit(assignments: [:title, :description, :due_date], assigned_to_ids: [])
     end

    def assignment_params
        assignment_param = params.require(:assignment).permit(:action_item_id,
                                                               :due_date,
                                                               :completed)
        assignment_param.merge(assigned_by_id: current_user.staff.id)
    end

end