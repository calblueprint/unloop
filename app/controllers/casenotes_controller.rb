class CasenotesController < ApplicationController

    def index
        @casenotes = Casenote.all
    end

    def new
        @casenote = Casenote.new
    end

    def edit
        @casenote = Casenote.find(params[:id])
    end

    def show
        @casenote = Casenote.find(params[:id])
    end
end
