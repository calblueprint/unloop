class Api::ProfessionalQuestionnairesController < ApplicationController
    before_action :set_questionnaire, only: [:update, :destroy]
    respond_to :json
  
    def create
      @questionnaire = ProfessionalQuestionnaire.new(questionnaire_params)
      authorize @questionnaire, policy_class: QuestionnairePolicy
      sentry_helper(@questionnaire)
      if @questionnaire.save
        render json: @questionnaire, status: :created
      else
        Raven.capture_message("Could not create professional questionnaire")
        render json: { error: 'Could not create professional questionnaire' }
      end
    end
  
    def update
      authorize @questionnaire, policy_class: QuestionnairePolicy
      if @questionnaire.update(questionnaire_params)
        render json: @questionnaire, status: :ok
      else
        Raven.capture_message("Could not update professional questionnaire")
        render json: { error: 'Could not update professional questionnaire' }, status: :unprocessable_entity
      end
    end
  
    def destroy
      authorize @questionnaire, policy_class: QuestionnairePolicy
      if @questionnaire.destroy
        render json: @questionnaire, status: :ok
      else
        Raven.capture_message("Failed to delete professional questionnaire")
        render json: { error: 'Failed to delete professional questionnaire' }, status: :unprocessable_entity
      end
    end
  
    private
    def set_questionnaire
      @questionnaire = authorize ProfessionalQuestionnaire.find(params[:id]), policy_class: QuestionnairePolicy
    rescue ActiveRecord::RecordNotFound => exception
      Raven.extra_context(professional_questionnaire_id: params[:id])
      Raven.capture_exception(exception)
      render json: { error: 'Could not find professional questionnaire' }, status: :not_found
    end

    def sentry_helper(professional_questionnaire)
      Raven.extra_context(professional_questionnaire: professional_questionnaire.attributes)
      Raven.extra_context(participant: professional_questionnaire.participant.user.attributes)
    end
  
    # may not work
    def questionnaire_params
      questionnaire_params = params.require(:professional_questionnaire).permit(:participant_id, :course_completion,
        :work_history, :job_search_materials, :professional_goals, 
        :barriers, :education_history, :begin_skills_assessment_date, :end_skills_assessment_date,
        :assigned_mentor, :success_strategies)
    end
  
  end
  