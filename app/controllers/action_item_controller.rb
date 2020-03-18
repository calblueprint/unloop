class ActionItemController < ApplicationController
    before_action :set_action_item, only:[:show, :edit]
    def index
        @action_items = authorize ActionItem.all
    end

    def new
        @action_item = authorize ActionItem.new

    end

    def edit
        @action_items = ActionItem.all
    end
    
    def show
    end

    private

    def set_action_item
        @action_item = authorize ActionItem.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        redirect_to action_items_path
    end

end
