class Api::AssignmentsController < ApplicationController
    before_action :set_assignment, only: [:show, :update, :destroy]
    before_action :set_template, only [:show_template, :update_template, :destroy_template]
    respond_to :json

    def create
        @action_item = authorize ActionItem.new(action_item_params)
        @action_item[:is_template] = false

        if @action_item.save
            @assignment = authorize Assignment.new(assignment_params)
            @assignment[:action_item_id] = @action_item.id
            if @assignment.save
                render json: @assignment, status: :created
            else
                @action_item.destroy
                render json: { error: 'Could not create action item' }, status: :unprocessable_entity
            end
        else
            render json: { error: 'Could not create action item' }, status: :unprocessable_entity
        end
    end

    def show
        authorize @assignment 
        render json: @assignment
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
            render json: @assignment, status: :ok
        else
            render json: { error: 'Failed to delete action item' }, status: :unprocessable_entity
        end
    end

    def create_template
        @template = authorize ActionItem.new(action_item_params)
        @template[:is_template] = true

        if @template.save
            render json: @template, status: :created
        else
            render json: { error: 'Could not create template' }, status: :unprocessable_entity
        end
    end

    def show_template
        authorize @template
        render json: @template, status: ok
    end

    def update_template
        authorize @template
        if @template.update(action_item_params)
            render json: @template, status: ok
        else
            render json: { error: 'Could not update template' }, status: :unprocessable_entity
        end
    end

    def destroy_template
        authorize @template
        if @template.destroy
            render json: @template, status: ok
        else
            render json: @template, status: ok
        end
    end

    def user_not_authorized
        render json: { error: 'You are not authorized to perform this action' }, status: :unauthorized
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

    def action_item_params
        action_item_param = params.require(:action_item).permit(:title,
                                                                :description)
    end

    def assignment_params
        assignment_param = params.require(:action_item).permit(:action_item_id,
                                                               :assigned_to_id,
                                                               :due_date)
        assignment_param.merge(assigned_by_id: current_user.staff.id)
    end

end