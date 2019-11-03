class Api::CasenotesController < ApplicationController
  before_action :set_casenote, only: [:show, :update, :internal, :destroy]
  respond_to :json

  def show
    render json: @casenote
  end

  def create
    @casenote = authorize Casenote.new(casenotes_params)
    if @casenote.save
      render json: @casenote, status: :created
    else
      render json: { error: 'Could not create case note' }, status: :unprocessable_entity
    end
  end

  def update
    authorize @casenote
    if @casenote.update(casenotes_params)
      render json: @casenote, status: :ok
    else
      render json: { error: 'Could not update case note' }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @casenote
    if @casenote.destroy
      render json: @casenote, status: :ok
    else
      render json: { error: 'Failed to delete case note' }, status: :unprocessable_entity
    end
  end

  def internal
    authorize @casenote
    if @casenote.update(internal: true)
      render json: @casenote, status: :ok
    else
      render json: { error: 'Failed to change internal to true' }, status: :unprocessable_entity
    end
  end

  private

  def set_casenote
    @casenote = authorize Casenote.find(params[:id])

  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Could not find case note' }, status: :not_found
  end

  def casenotes_params
    casenotes_param = params.require(:casenote).permit(:title, 
                                                       :description, 
                                                       :internal, 
                                                       :participant_id)
    casenotes_param.merge(staff_id: current_user.staff.id)
  end
end
