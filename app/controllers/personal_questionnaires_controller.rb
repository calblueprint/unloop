class PersonalQuestionnairesController < ApplicationController
  before_action :set_personal_questionnaire, only: [:show, :edit]

  def index
    skip_policy_scope 
    @questionnaires = PersonalQuestionnaire.all
    @questionnaireFields = PersonalQuestionnaire.column_names
    @user = current_user
  end
  
  def show
  end

  def new
    @questionnaire = authorize PersonalQuestionnaire.new,  policy_class: QuestionnairePolicy
    @participants = Participant.all
  end

  def edit
  end

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(request.referrer || root_path)
  end

  private

  def set_personal_questionnaire
    @questionnaire = authorize PersonalQuestionnaire.find(params[:id]),  policy_class: QuestionnairePolicy
  rescue ActiveRecord::RecordNotFound => exception
    Raven.extra_context(personal_questionnaire_id: params[:id])
    Raven.capture_exception(exception)
    redirect_to personal_questionnaires_path
  end
end
