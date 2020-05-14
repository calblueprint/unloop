class ParticipantsController < ApplicationController
  before_action :set_participant, only: [:show]

  def show
    # Run this method when we're a staff
    @participant = authorize Participant.find(params[:id])
    @paperworks = authorize @participant.paperworks
    @case_notes = authorize @participant.case_notes
    @studio_assessments = authorize @participant.studio_assessments

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

    @assignments = @participant.assignments
    @assignment_list = []
    @assignments.each do |a|
      action_item = ActionItem.where(id: a.action_item_id).first
      complete_assignment = {
        "id" => a.id,
        "title" => action_item.title, 
        "description" => action_item.description,
        "category" => action_item.category,
        "is_template" => action_item.is_template,
        "created_at" => a.created_at,
        "updated_at" => a.updated_at,
        "due_date" => a.due_date&.strftime("%Y-%m-%d"),
        "action_item_id" => a.action_item_id,
      }
      @assignment_list.push(complete_assignment)
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
