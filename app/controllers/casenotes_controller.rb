class CasenotesController < ApplicationController
  def index
    @casenotes = authorize Casenote.all
  end

  def new
    @casenote = authorize Casenote.new
    @participants = Participant.all
  end

  def edit
    @casenote = authorize Casenote.find(params[:id])
    @participants = Participant.all
  end

  def show
    @casenote = authorize Casenote.find(params[:id])
  end
end
