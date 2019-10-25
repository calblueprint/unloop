class Api::PersonalQuestionnaireController < ApplicationController
    before_action :set_personal_questionnaire, only: [:show, :update, :destroy]
    respond_to :json
  
    def show
      render json: @questionnaire
    end
  
    def create
      @questionnaire = PersonalQuestionnaire.new(questionnaire_params)
      authorize @questionnaire, policy_class: QuestionnairePolicy
      if @questionnaire.save
        render json: @questionnaire, status: :created
      else
        render json: { error: 'Could not create personal questionnaire' }, status: :unprocessable_entity
      end
    end
  
    def update
      @questionnaire = PersonalQuestionnaire.find(params[:id])
      authorize @questionnaire, policy_class: QuestionnairePolicy
      if @questionnaire.update(questionnaire_params)
        render json: @questionnaire, status: :ok
      else
        render json: { error: 'Could not update personal questionnaire' }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @questionnaire = PersonalQuestionnaire.find(params[:id])
      authorize @questionnaire, policy_class: QuestionnairePolicy
      if @questionnaire.destroy
        render json: @questionnaire, status: :ok
      else
        render json: { error: 'Failed to delete personal questionnaire' }, status: :unprocessable_entity
      end
    end
  
    private
  
    # may not work
    def questionnaire_params
      questionnaire_params = params.require(:questionnaire).permit(:participant_id)
    end
  
  end
  