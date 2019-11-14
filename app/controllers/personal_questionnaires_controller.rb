class PersonalQuestionnairesController < ApplicationController
  def index
    skip_policy_scope 
    @questionnaires = PersonalQuestionnaire.all
    @questionnaireFields = PersonalQuestionnaire.column_names
    @user = current_user
  end
  
  def show
    @questionnaire = authorize PersonalQuestionnaire.find(params[:id]),  policy_class: QuestionnairePolicy
  end

  def new
    @questionnaire = authorize PersonalQuestionnaire.new,  policy_class: QuestionnairePolicy
    @participants = Participant.all
  end

  def edit
    @questionnaire = authorize PersonalQuestionnaire.find(params[:id]),  policy_class: QuestionnairePolicy
  end

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(request.referrer || root_path)
  end
end
