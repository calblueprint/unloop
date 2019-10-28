class PaperworksController < ApplicationController
  before_action :current_user

  def index
    @paperworks = Paperwork.all
  end

  def show
    @paperwork = Paperwork.find(params[:id])
  end

  def new
    @paperwork = Paperwork.new
    @participants = Participant.all
  end

  def edit
    @paperwork = Paperwork.find(params[:id])
    @participants = Participant.all
  end
end
