class AssignmentsController < ApplicationController
    before_action :set_assignment, only:[:show, :edit]
    def index
        @assignments = authorize Assignments.all
    end

    def new
        @assignment = authorize Assignments.new
    end

    def edit
        @assignment = authorize Assignments.where(action_item: @action_item)
    end
    
    def show
        @assignment = authorize Assignments.where(action_item: @action_item)
    end

    private

    def set_action_item
        @action_item = Assignments.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        redirect_to assignments_path
    end

end
