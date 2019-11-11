class ParticipantsController < ApplicationController
  def show
    @participant = authorize Participant.find(params[:id])
    @paperworks = @participant.paperworks
    @case_notes = @participant.case_notes

    if @participant.personal_questionnaire.nil?
      @personal_questionnaire = PersonalQuestionnaire.create("participant_id": @participant.id)
    else
      @personal_questionnaire = @participant.personal_questionnaire
    end

    if @participant.professional_questionnaire.nil?
      @professional_questionnaire = ProfessionalQuestionnaire.create("participant_id": @participant.id)
    else
      @professional_questionnaire = @participant.personal_questionnaire
    end
    
  end

  def dashboard
    redirect_to root_path
  end
end
