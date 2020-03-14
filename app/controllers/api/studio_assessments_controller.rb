class Api::StudioAssessmentsController < ApplicationController
    before_action :set_case_note, only: [:show, :update, :destroy]
    respond_to :json

    def create
        @studio_assessment = authorize StudioAssessment.new(studio_assessment_params)
        if @studio_assessment.save
            render json: @studio_assessment, status: :created
        else
            render json: { error: 'Could not create studio assessment' }, status: :unprocessable_entity
        end
    end

    def user_not_authorized
        render json: { error: 'You are not authorized to perform this action' }, status: :unauthorized
    end
    
    def show
        @studio_assessment = authorize StudioAssessment.find(params[:id])
        render json: @studio_assessment
    end
    
    def update
        @studio_assessment = authorize StudioAssessment.find(params[:id])
        if @studio_assessment.update(studio_assessment_params)
            render json: @studio_assessment, status: :ok
        else
            render json: { error: 'Could not update studio assessment' }, status: :unprocessable_entity
        end
    end

    def destroy
        @studio_assessment = authorize StudioAssessment.find(params[:id])
        if @studio_assessment.destroy
            render json: @studio_assessment, status: :ok
        else
            render json: { error: 'Failed to delete studio assessment' }, status: :unprocessable_entity
        end
    end

    private
    def studio_assessment_params
        case_notes_param = params.require(:studio_assessment).permit(:participant_id, 
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