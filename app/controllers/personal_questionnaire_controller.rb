class PersonalQuestionnaireController < ApplicationController
  def index
    @questionnaires = PersonalQuestionnaire.all
  end
  
  def show
    @questionnaire = PersonalQuestionnaire.find(params[:id])
  end

  def new
    @questionnaire = PersonalQuestionnaire.new
  end

  def create
    @questionnaire = PersonalQuestionnaire.new(questionnaire_params)

    saved = @questionnaire.save
    if saved
      redirect_to @questionnaire
    else
      render 'new'
    end
  end

  def update
    @questionnaire = PersonalQuestionnaire.find(params[:id])
    if @questionnaire.update(questionnaire_params)
      redirect_to @questionnaire
    else
      render 'edit'
    end
  end

  def destroy
    @questionnaire = PersonalQuestionnaire.find(params[:id])
    @questionnaire.destroy
    
    # may not work
    redirect_to personal_questionnaire_path
  end

  private

  # may not work
  def questionnaire_params
    # TODO need to add in other parameters
    questionnaire_params = params.require(:questionnaire).permit(:participant_id)
  
  end
end
