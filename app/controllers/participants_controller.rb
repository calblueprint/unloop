class ParticipantsController < ApplicationController
  before_action :set_participant, only: [:show]

  def show
    # Run this method when we're a staff
    @participant = authorize Participant.find(params[:id])
    @paperworks = @participant.paperworks
    @case_notes = @participant.case_notes
    @assignments = @participant.assignments
    @studio_assessments = @participant.studio_assessments

    if @participant.personal_questionnaire.nil?
      personal_q = PersonalQuestionnaire.create("participant_id": @participant.id)
    else
      personal_q = @participant.personal_questionnaire
    end
    @personal_questionnaire = PersonalQuestionnaireSerializer.new(personal_q)

    if @participant.professional_questionnaire.nil?
      professional_q = ProfessionalQuestionnaire.create("participant_id": @participant.id)
    else
      professional_q = @participant.professional_questionnaire
    end
    @professional_questionnaire = ProfessionalQuestionnairesSerializer.new(professional_q)

    @studio_assessments = @participant.studio_assessments

    # @dummy = 0 # for loop over assignments
    
  end

  def dashboard
    # Run this method when we're a participant
    redirect_to root_path
  end

  private

  def set_participant
    @participant = authorize Participant.find(params[:id])
  rescue ActiveRecord::RecordNotFound => exception
    Raven.extra_context(participant_id: params[:id])
    Raven.capture_exception(exception)
    redirect_to participant_path
  end
end
