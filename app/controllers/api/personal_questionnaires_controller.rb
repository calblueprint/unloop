class Api::PersonalQuestionnairesController < ApplicationController
    before_action :set_questionnaire, only: [:show, :update, :destroy]
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
      authorize @questionnaire, policy_class: QuestionnairePolicy
      if @questionnaire.update(questionnaire_params)
        render json: @questionnaire, status: :ok
      else
        render json: { error: 'Could not update personal questionnaire' }, status: :unprocessable_entity
      end
    end
  
    def destroy
      authorize @questionnaire, policy_class: QuestionnairePolicy
      if @questionnaire.destroy
        render json: @questionnaire, status: :ok
      else
        render json: { error: 'Failed to delete personal questionnaire' }, status: :unprocessable_entity
      end
    end
  
    private
    def set_questionnaire
      @questionnaire = authorize PersonalQuestionnaire.find(params[:id]), policy_class: QuestionnairePolicy
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Could not find personal questionnaire' }, status: :not_found
    end
  
    def questionnaire_params
      questionnaire_params = params.require(:personal_questionnaire).permit(:participant_id, 
        :contact_info,
        :emergency_contact,
        :doc_status,
        :housing,
        :mental_health,
        :medical,
        :transportation,
        :clothing,
        :significant_relationships,
        :support_systems,
        :doc_regulations,
        :treatment,
        :triggers_and_prevention,
        :personal_needs,
        :success_tools,
        :personal_goals)
    
    end
  
  end
  