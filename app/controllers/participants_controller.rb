class ParticipantsController < ApplicationController
  def show
    puts params
    @participant = authorize Participant.find(params[:id])
    @paperworks = @participant.paperworks
    @case_notes = @participant.case_notes
  end

  def dashboard
    redirect_to root_path
  end
end
