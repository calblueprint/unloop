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

  def create
    @paperwork = Paperwork.new(paperwork_params)
    saved = @paperwork.save
    if saved
      redirect_to @paperwork
    else
      render 'new'
    end
  end

  def edit
    @paperwork = Paperwork.find(params[:id])
  end

  def update
    @paperwork = Paperwork.find(params[:id])
    if @paperwork.update(paperwork_params)
      redirect_to @paperwork
    else
      render 'edit'
    end
  end

  def complete
    @paperwork = Paperwork.find(params[:id])
    respond_to do |format|
      if @paperwork.update(agree: true)
        format.html { redirect_to @paperwork, notice: 'Paperwork has been marked as agreed.' }
        format.json { render :show, status: :ok, location: @paperwork }
      else
        format.html { render :new }
        format.json { render json: @paperwork.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @paperwork = Paperwork.find(params[:id])
    @paperwork.destroy
    
    redirect_to paperworks_path
  end

  private

  def paperwork_params
    paperwork_param = params.require(:paperwork).permit(:title, :link, :agree)
    # TODO: Make sure to specify staff and participant
    paperwork_param.merge(staff_id: 1, participant_id: 1)
  end
end
