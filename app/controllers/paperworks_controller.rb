class PaperworksController < ApplicationController
  before_action :set_paperwork, only: [:show, :edit]

  def index
    @paperworks = authorize Paperwork.all
    @user = current_user
    skip_policy_scope
  end

  def show
  end

  def new
    @paperwork = authorize Paperwork.new
    @participants = Participant.all
  end

  def edit
    @participants = Participant.all
  end

  private

  def set_paperwork
    @paperwork = authorize Paperwork.find(params[:id])
  rescue ActiveRecord::RecordNotFound => exception
    Raven.capture_exception(exception)
    redirect_to paperworks_path
  end
end
