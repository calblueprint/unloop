class ProfessionalQuestionnaireController < ApplicationController
  def index
    @questionnaires = ProfessionalQuestionnaire.all

  end
  
  def show
    @questionnaire = authorize ProfessionalQuestionnaire.find(params[:id])
  end

  def new
    @questionnaire = ProfessionalQuestionnaire.new
  end

  def create
    @questionnaire = ProfessionalQuestionnaire.new(questionnaire_params)
    authorize @questionnaire
    saved = @questionnaire.save
    if saved
      redirect_to @questionnaire
    else
      render 'new'
    end
  end

  def update
    @questionnaire = ProfessionalQuestionnaire.find(params[:id])
    authorize @questionnaire
    if @questionnaire.update(questionnaire_params)
      redirect_to @questionnaire
    else
      render :edit
    end
  end

  def destroy
    @questionnaire = ProfessionalQuestionnaire.find(params[:id])
    authorize @questionnaire
    @questionnaire.destroy

    # may not work
    redirect_to professional_questionnaire_path
  end

  private

  # may not work
  def questionnaire_params
    questionnaire_params = params.require(:questionnaire).permit(:participant_id, :course_completion,
      :work_history, :job_search_materials, :professional_goals, :skills_assessment_date, 
      :barriers, :mentorship_interest,:success_strategies)
  end
end
