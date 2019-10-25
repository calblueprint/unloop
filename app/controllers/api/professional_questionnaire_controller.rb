class Api::ProfessionalQuestionnaireController < ApplicationController
    before_action :set_questionnaire, only: [:show, :update, :destroy]
    respond_to :json
  
    def show
      render json: @questionnaire
    end
  
    def create
      @questionnaire = ProfessionalQuestionnaire.new(questionnaire_params)
      authorize @questionnaire, policy_class: QuestionnairePolicy
      if @questionnaire.save
        render json: @questionnaire, status: :created
      else
        render json: { error: 'Could not create professional questionnaire' }, status: :unprocessable_entity
      end
    end
  
    def update
      authorize @questionnaire, policy_class: QuestionnairePolicy
      if @questionnaire.update(questionnaire_params)
        render json: @questionnaire, status: :ok
      else
        render json: { error: 'Could not update professional questionnaire' }, status: :unprocessable_entity
      end
    end
  
    def destroy
      authorize @questionnaire, policy_class: QuestionnairePolicy
      if @questionnaire.destroy
        render json: @questionnaire, status: :ok
      else
        render json: { error: 'Failed to delete professional questionnaire' }, status: :unprocessable_entity
      end
    end
  
    private
    def set_questionnaire
      @questionnaire = authorize ProfessionalQuestionnaire.find(params[:id]), policy_class: QuestionnairePolicy
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Could not find professional questionnaire' }, status: :not_found
    end
  
    # may not work
    def questionnaire_params
      questionnaire_params = params.require(:questionnaire).permit(:participant_id, :course_completion,
        :work_history, :job_search_materials, :professional_goals, :skills_assessment_date, 
        :barriers, :mentorship_interest,:success_strategies)
    end
  
  end
  