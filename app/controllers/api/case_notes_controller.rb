class Api::CaseNotesController < ApplicationController
  before_action :set_case_note, only: [:update, :not_visible, :destroy]
  respond_to :json

  def create
    @case_note = authorize CaseNote.new(case_notes_params)
    sentry_helper(@case_note)
    if @case_note.save
      render json: @case_note, status: :created
    else
      Raven.capture_message("Could not create case note")
      render json: { error: 'Could not create case note' }, status: :unprocessable_entity
    end
  end

  def update
    if @case_note.update(case_notes_params)
      render json: @case_note, status: :ok
    else
      Raven.capture_message("Could not update case note")
      render json: { error: 'Could not update case note' }, status: :unprocessable_entity
    end
  end

  def destroy
    if @case_note.destroy
      render json: @case_note, status: :ok
    else
      Raven.capture_message("Failed to delete case note")
      render json: { error: 'Failed to delete case note' }, status: :unprocessable_entity
    end
  end

  def not_visible
    if @case_note.update(visible: false)
      render json: @case_note, status: :ok
    else
      Raven.capture_message("Failed to change visible to false")
      render json: { error: 'Failed to change visible to false' }, status: :unprocessable_entity
    end
  end

  def user_not_authorized
    render json: { error: 'You are not authorized to perform this action' }, status: :unauthorized
  end  

  private

  def set_case_note
    @case_note = authorize CaseNote.find(params[:id])
    sentry_helper(@case_note)
  rescue ActiveRecord::RecordNotFound => exception
    Raven.extra_context(case_note_id: params[:id])
    Raven.capture_exception(exception)
    render json: { error: 'Could not find case note' }, status: :not_found
  end

  def sentry_helper(case_note)
    Raven.extra_context(case_note: case_note.attributes)
    Raven.extra_context(staff: case_note.staff.user.attributes)
    Raven.extra_context(participant: case_note.participant.user.attributes)
  end

  def case_notes_params
    case_notes_param = params.require(:case_note).permit(:title, 
                                                       :description, 
                                                       :visible, 
                                                       :participant_id)
    case_notes_param.merge(staff_id: current_user.staff.id)
  end
end
