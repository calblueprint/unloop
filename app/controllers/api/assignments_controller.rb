class Api::AssignmentsController < ApplicationController
    before_action :set_assignment, only: [:show, :update, :destroy]
    before_action :set_template, only: [:show_template, :update_template, :destroy_template]
    respond_to :json

    def create
        @action_item = authorize ActionItem.new(action_item_params)
        @action_item[:is_template] = false

        if @action_item.save
            created_assignments = []
            prepare_bulk_assignment(assigned_to_ids, @action_item.id).each do |assignment_params|
                @assignment = authorize Assignment.new(assignment_params)
                if @assignment.save
                    created_assignments.append(@assignment)
                else
                    @action_item.destroy
                    render json: { error: 'Could not create action item' }, status: :unprocessable_entity
                    return 
                end
            end
            render json: created_assignments, status: :created
        else
            render json: { error: 'Could not create action item' }, status: :unprocessable_entity
        end
    end 

    def show
        authorize @assignment 
        render json: @assignment, status: :ok
    end

    def update
        authorize @assignment
        if @assignment.update(assignment_params) && @assignment.action_item.update(action_item_params)
            render json: @assignment, status: :ok
        else
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
            render json: { error: 'Failed to delete action item' }, status: :unprocessable_entity
        end
    end

    def create_template
        @template = authorize ActionItem.new(action_item_params), :create?
        @template[:is_template] = true

        if @template.save
            render json: @template, status: :created
        else
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
            render json: { error: 'Could not update template' }, status: :unprocessable_entity
        end
    end

    def destroy_template
        authorize @template, :destroy?
        if @template.destroy
            render json: @template, status: :ok
        else
            render json: { error: 'Failed to delete action item template' }, status: :unprocessable_entity
        end
    end

    private
    
    def set_template
        @template = ActionItem.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'Could not find Action Item Template' }, status: :not_found
    end

    def set_assignment
        @assignment = Assignment.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'Could not find Action Item' }, status: :not_found
    end

    def prepare_bulk_assignment(assigned_to_ids, action_item_id)
        bulk_assignment_params = []
        single_assignment_params = assignment_params
        assigned_to_ids.each do |id|
            bulk_assignment_params.append(single_assignment_params.merge(assigned_to_id: id, 
                                                                         action_item_id: action_item_id))
        end
        return bulk_assignment_params
    end

    def action_item_params
        action_item_param = params.require(:assignment).permit(:title,
                                                                :description)
    end

    def assigned_to_ids
        params.require(:assignment).permit(assigned_to_ids: []).fetch(:assigned_to_ids, [])
    end

    def assignment_params
        assignment_param = params.require(:assignment).permit(:action_item_id,
                                                               :due_date,
                                                               :completed)
        assignment_param.merge(assigned_by_id: current_user.staff.id)
    end

end