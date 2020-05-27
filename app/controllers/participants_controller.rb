class ParticipantsController < ApplicationController
  before_action :set_participant, only: [:show]

  def show
    # Run this method when we're a staff
    @participant = authorize Participant.find(params[:id])
    @paperworks = authorize @participant.paperworks.order('created_at DESC')
    @case_notes = authorize @participant.case_notes.order('created_at DESC')
    @studio_assessments = authorize @participant.studio_assessments.order('created_at DESC')

    if @participant.personal_questionnaire.nil?
      personal_q = PersonalQuestionnaire.create("participant_id": @participant.id)
    else
      personal_q = authorize @participant.personal_questionnaire, policy_class: QuestionnairePolicy
    end
    @personal_questionnaire = PersonalQuestionnaireSerializer.new(personal_q)

    if @participant.professional_questionnaire.nil?
      professional_q = ProfessionalQuestionnaire.create("participant_id": @participant.id)
    else
      professional_q = authorize @participant.professional_questionnaire, policy_class: QuestionnairePolicy
    end
    @professional_questionnaire = ProfessionalQuestionnairesSerializer.new(professional_q)

    @resumeURL = nil
    if (professional_q.resume.attached?)
      @resumeURL = url_for(professional_q.resume)
    end

    @assignments = authorize @participant.assignments.order('due_date')
    @assignment_list = []
    @assignments.each do |a|
      serialized_assignment = AssignmentSerializer.new(a)
      @assignment_list.push(serialized_assignment)
    end
    
  end


  def dashboard
    skip_authorization
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