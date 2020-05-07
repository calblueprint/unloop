class ProfessionalQuestionnairesController < ApplicationController
  before_action :set_professional_questionnaire, only: [:show, :edit]

  def index
    @questionnaires = authorize ProfessionalQuestionnaire.all
    @questionnaireFields = ProfessionalQuestionnaire.column_names
    @user = current_user
  end
  
  def show
  end

  def new
    @questionnaire = authorize ProfessionalQuestionnaire.new,  policy_class: QuestionnairePolicy
    @participants = Participant.all
  end

  def edit
  end

  private

  def set_professional_questionnaire
    @questionnaire = authorize ProfessionalQuestionnaire.find(params[:id]),  policy_class: QuestionnairePolicy
  rescue ActiveRecord::RecordNotFound => exception
    Raven.extra_context(professional_questionnaire_id: params[:id])
    Raven.capture_exception(exception)
    redirect_to professional_questionnaires_path
  end

end