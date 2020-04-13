class AssignmentsController < ApplicationController
    before_action :set_action_item, only:[:show, :edit]
    def index
        @assignments = authorize Assignment.all
        @user = current_user
        skip_policy_scope
    end

    def new
        @assignment = authorize Assignment.new
    end

    def edit
        authorize @assignment
        @staffs = Staff.all
        @all_users = User.all
    end
    
    def show
        authorize @assignment
    end

    private

    def set_action_item
        @assignment = Assignment.find(params[:id])
    rescue ActiveRecord::RecordNotFound => exception
        Raven.extra_context(assignment: params[:id])
        Raven.capture_exception(exception)
        redirect_to assignments_path
    end

end
