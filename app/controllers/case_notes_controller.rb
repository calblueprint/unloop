class CaseNotesController < ApplicationController
  before_action :set_case_note, only: [:show, :edit]

  def index
    @case_notes = authorize CaseNote.all
  end

  def new
    @case_note = authorize CaseNote.new
    @participants = Participant.all
  end

  def edit
    @case_note = authorize CaseNote.find(params[:id])
    @participants = Participant.all
  end

  def show
    @case_note = authorize CaseNote.find(params[:id])
  end

  private

  def set_case_note
    @case_note = authorize CaseNote.find(params[:id])

  rescue ActiveRecord::RecordNotFound
    redirect_to case_notes_path
  end  
end
