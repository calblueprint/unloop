class CasenotesController < ApplicationController
  def index
    @casenotes = Casenote.all
  end

  def new
    @casenote = Casenote.new
    @participants = Participant.all
  end

  def edit
    @casenote = Casenote.find(params[:id])
    @participants = Participant.all
  end

  def show
    @casenote = Casenote.find(params[:id])
  end
end
