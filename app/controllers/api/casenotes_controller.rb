class Api::CasenotesController < ApplicationController
  before_action :set_casenote, only: [:show, :update, :internal, :destroy]
  respond_to :json

  def show
    render json: @casenote
  end

  def create
    @casenote = Casenote.new(casenotes_params)
    if @casenote.save
      render json: @casenote, status: :created
    else
      render json: { error: 'Could not create case note' }, status: :unprocessable_entity
    end
  end

  def update
    if @casenote.update(casenotes_params)
      render json: @casenote, status: :ok
    else
      render json: { error: 'Could not update case note' }, status: :unprocessable_entity
    end
  end

  def destroy
    if @casenote.destroy
      render json: @casenote, status: :ok
    else
      render json: { error: 'Failed to delete case note' }, status: :unprocessable_entity
    end
  end

  def internal
    if @casenote.update(internal: true)
      render json: @casenote, status: :ok
    else
      render json: { error: 'Failed to change internal to true' }, status: :unprocessable_entity
    end
  end

  private

  def set_casenote
    @casenote = Casenote.find(params[:id])

  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Could not find case note' }, status: :not_found
  end

  def casenotes_params
    casenotes_param = params.require(:casenote).permit(:title, 
                                                       :description, 
                                                       :internal, 
                                                       :participant_id)
    # TODO: Replace staff_id with current_omniuser
    casenotes_param.merge(staff_id: 1)
  end
end
