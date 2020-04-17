class ParticipantsController < ApplicationController
  def show
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

    if @participant.studio_assessments.nil?
      studio_assessment = StudioAssessment.create("participant_id": @participant.id)
      @studio_assessments[studio_assessment.id] = StudioAssessmentSerializer.new(studio_assessment)
    else
      @studio_assessments = @participant.studio_assessments
    end
    # @studio_assessments[studio_assessment.id] = StudioAssessmentSerializer.new(studio_assessment)
  end

  def dashboard
    redirect_to root_path
  end
end
