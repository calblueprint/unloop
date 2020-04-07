class CaseNotesController < ApplicationController
  before_action :set_case_note, only: [:show, :edit]

  def index
    @case_notes = authorize CaseNote.all
    skip_policy_scope
  end

  def new
    @case_note = authorize CaseNote.new
    @participants = Participant.all
  end

  def edit
    @participants = Participant.all
  end

  def show
  end

  private

  def set_case_note
    @case_note = authorize CaseNote.find(params[:id])
  rescue ActiveRecord::RecordNotFound => exception
    Raven.capture_exception(exception)
    redirect_to case_notes_path
  end  
end
