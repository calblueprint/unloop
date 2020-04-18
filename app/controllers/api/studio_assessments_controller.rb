class Api::StudioAssessmentsController < ApplicationController
    before_action :set_studio_assessment, only: [:show, :update, :destroy]
    respond_to :json

    def create
        @studio_assessment = authorize StudioAssessment.new(studio_assessment_params)
        sentry_helper(@studio_assessment)
        if @studio_assessment.save
            render json: @studio_assessment, status: :created
        else
            Raven.capture_message("Could not create studio assessment")
            render json: { error: 'Could not create studio assessment' }, status: :unprocessable_entity
        end
    end

    def user_not_authorized
        render json: { error: 'You are not authorized to perform this action' }, status: :unauthorized
    end
    
    def show
        render json: @studio_assessment
    end
    
    def update
        if @studio_assessment.update(studio_assessment_params)
            render json: @studio_assessment, status: :ok
        else
            Raven.capture_message("Could not update studio assessment")
            render json: { error: 'Could not update studio assessment' }, status: :unprocessable_entity
        end
    end

    def destroy
        if @studio_assessment.destroy
            render json: @studio_assessment, status: :ok
        else
            Raven.capture_message("Failed to delete studio assessment")
            render json: { error: 'Failed to delete studio assessment' }, status: :unprocessable_entity
        end
    end

    private
    
    def set_studio_assessment
        @studio_assessment = authorize StudioAssessment.find(params[:id])
        sentry_helper(@studio_assessment)
    rescue ActiveRecord::RecordNotFound => exception
        Raven.extra_context(studio_assessment_id: params[:id])
        Raven.capture_exception(exception)
        render json: { error: 'Could not find case note' }, status: :not_found
    end

    def sentry_helper(studio_assessment)
        studio_assessment = authorize StudioAssessment.find(params[:id])
        Raven.extra_context(studio_assessment: studio_assessment.attributes)
        Raven.extra_context(staff: studio_assessment.staff.user.attributes)
        Raven.extra_context(participant: studio_assessment.participant.user.attributes)
    end

    def studio_assessment_params
        studio_assessment_param = params.require(:studio_assessment).permit(:participant_id, 
                                                                    :bigpicture_score, 
                                                                    :bigpicture_comment, 
                                                                    :progfundamentals_score, 
                                                                    :progfundamentals_comment, 
                                                                    :versioncontrol_score, 
                                                                    :versioncontrol_comment, 
                                                                    :react_score, 
                                                                    :react_comment, 
                                                                    :node_score, 
                                                                    :node_comment, 
                                                                    :db_score, 
                                                                    :db_comment,
                                                                    :problemsolving_score,
                                                                    :problemsolving_comment,
                                                                    :problemsolvingalt_score,
                                                                    :problemsolvingalt_comment,
                                                                    :capstone_passed,
                                                                    :capstone_comment,
                                                                    :assessment_type)

        studio_assessment_param.merge(staff_id: current_user.staff.id)
    end
end