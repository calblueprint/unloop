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

def create
    @casenote = Casenote.new(casenotes_params)
    if @casenote.save
        redirect_to @casenote
    else
        render 'new'
    end
end

def update
    @casenote = Casenote.find(params[:id])
    if @casenote.update(casenotes_params)
        redirect_to @casenote
    else
        render 'edit'
    end
end

def destroy
    @casenote = Casenote.find(params[:id])
    @casenote.destroy
    redirect_to casenotes_path
end

def internal
    @casenote = Casenote.find(params[:id])

    respond_to do |format|
        if @casenote.update(internal: true)
            format.html { redirect_to @casenote, notice: 'Casenote has been marked as internal.' }
            format.json { render :show, status: :ok, location: @casenote }
        else
            format.html { render :new }
            format.json { render json: @casenote.errors, status: :unprocessable_entity }
        end
    end
end


private 
def casenotes_params
    casenotes_param = params.require(:casenote).permit(:title, :description, :internal)
    casenotes_param.merge(staff_id: 1, participant_id: 1)
end