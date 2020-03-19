class AssignmentsController < ApplicationController
    before_action :set_assignment, only:[:show, :edit]
    def index
        @action_items = authorize Assignments.all
    end

    def new
        @action_item = authorize Assignments.new

    end

    def edit
        @action_items = authorize Assignments.all
    end
    
    def show
    end

    private

    def set_action_item
        @action_item = Assignments.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        redirect_to assignments_path
    end

end
