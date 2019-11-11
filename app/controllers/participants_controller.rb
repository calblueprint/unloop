class ParticipantsController < ApplicationController
  def show
    @participant = authorize Participant.find(params[:id])
    @paperworks = @participant.paperworks
    @case_notes = @participant.case_notes
    @personal_questionnaire = @participant.personal_questionnaire
    @professional_questionnaire = @participant.professional_questionnaire
  end

  def dashboard
    redirect_to root_path
  end
end
