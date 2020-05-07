class Api::PersonalQuestionnairesController < ApplicationController
    before_action :set_questionnaire, only: [:show, :update, :destroy]
    respond_to :json
  
    def show
      render json: @questionnaire
    end
  
    def create
      @questionnaire = PersonalQuestionnaire.new(questionnaire_params)
      authorize @questionnaire, policy_class: QuestionnairePolicy
      sentry_helper(@questionnaire)
      if @questionnaire.save
        render json: @questionnaire, status: :created
      else
        Raven.capture_message("Could not create personal questionnaire")
        render json: { error: 'Could not create personal questionnaire' }, status: :unprocessable_entity
      end
    end
  
    def update
      authorize @questionnaire, policy_class: QuestionnairePolicy
      if @questionnaire.update(questionnaire_params)
        render json: @questionnaire, status: :ok
      else
        Raven.capture_message("Could not update personal questionnaire")
        render json: { error: 'Could not update personal questionnaire' }, status: :unprocessable_entity
      end
    end
  
    def destroy
      authorize @questionnaire, policy_class: QuestionnairePolicy
      if @questionnaire.destroy
        render json: @questionnaire, status: :ok
      else
        Raven.capture_message("Failed to delete personal questionnaire")
        render json: { error: 'Failed to delete personal questionnaire' }, status: :unprocessable_entity
      end
    end
  
    private
    def set_questionnaire
      @questionnaire = authorize PersonalQuestionnaire.find(params[:id]), policy_class: QuestionnairePolicy
      sentry_helper(@questionnaire)
    rescue ActiveRecord::RecordNotFound => exception
      Raven.extra_context(personal_questionnaire_id: params[:id])
      Raven.capture_exception(exception)
      render json: { error: 'Could not find personal questionnaire' }, status: :not_found
    end

    def sentry_helper(personal_questionnaire)
      Raven.extra_context(case_note: personal_questionnaire.attributes)
      Raven.extra_context(participant: personal_questionnaire.participant.user.attributes)
    end
  
    def questionnaire_params
      questionnaire_params = params.require(:personal_questionnaire).permit(:participant_id, 
        :DOC_status,
        :housing,
        :mental_health,
        :medical,
        :transportation,
        :clothing,
        :significant_relationships,
        :support_systems,
        :DOC_regulations,
        :treatment,
        :triggers_and_prevention,
        :personal_needs,
        :personal_goals,
        :birthdate,
        :phone_number,
        :pronouns,
        :race_and_ethnicities,
        :drivers_license_status,
        :emergency_contact_name,
        :emergency_contact_phone_number,
        :emergency_contact_relationship,
        :financial_obligations,
        :resources_allocated,
        :orca_card,
        :state_assistance)
    
    end
  
  end
  