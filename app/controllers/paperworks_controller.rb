class PaperworksController < ApplicationController
  def index
    @paperworks = Paperwork.all
  end
  
  def show
    @paperwork = Paperwork.find(params[:id])
  end

  def new
    @paperwork = Paperwork.new
  end

  def edit
    @paperwork = Paperwork.find(params[:id])
  end
end
