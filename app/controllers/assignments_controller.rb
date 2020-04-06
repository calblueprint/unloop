class AssignmentsController < ApplicationController
<<<<<<< HEAD
  def index
    skip_policy_scope
  end
=======
    before_action :set_action_item, only:[:show, :edit]
    def index
        @assignments = authorize Assignment.all
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
    rescue ActiveRecord::RecordNotFound
        redirect_to assignments_path
    end

>>>>>>> master
end
