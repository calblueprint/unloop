class PaperworksController < ApplicationController
  def index
    @paperworks = Paperwork.all
    @user = current_omniuser
  end

  def show
    @paperwork = authorize Paperwork.find(params[:id])
  end

  def new
    @paperwork = authorize Paperwork.new
    @participants = Participant.all
  end

  def edit
    @paperwork = authorize Paperwork.find(params[:id])
    @participants = Participant.all
  end
end
