class ProfessionalQuestionnairesController < ApplicationController
  def index
    @questionnaires = authorize ProfessionalQuestionnaire.all,  policy_class: QuestionnairePolicy
    @questionnaireFields = ProfessionalQuestionnaire.column_names
    @user = current_omniuser
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