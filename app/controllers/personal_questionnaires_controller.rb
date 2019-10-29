class PersonalQuestionnairesController < ApplicationController
  def index
    @questionnaires = authorize PersonalQuestionnaire.all,  policy_class: QuestionnairePolicy
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

end
