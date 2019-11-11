class ProfessionalQuestionnairesController < ApplicationController
  def index
    skip_policy_scope
    @questionnaires = ProfessionalQuestionnaire.all
    @questionnaireFields = ProfessionalQuestionnaire.column_names
    @user = current_user
  end
  
  def show
    @questionnaire = authorize ProfessionalQuestionnaire.find(params[:id]),  policy_class: QuestionnairePolicy
  end

  def new
    @questionnaire = authorize ProfessionalQuestionnaire.new,  policy_class: QuestionnairePolicy
    @participants = Participant.all
  end

  def edit
    @questionnaire = authorize ProfessionalQuestionnaire.find(params[:id]),  policy_class: QuestionnairePolicy
  end

end