class Api::StudioAssessmentsController < ApplicationController
    before_action :set_case_note, only: [:show, :update, :destroy]
    respond_to :json

    def show
        render json: @studio_assessment
    end

    def create
        @studio_assessment = authorize CaseNote.new(studio_assessment_params)
        if @studio_assessment.save
            render json: @studio_assessment, status: :created
        else
            render json: { error: 'Could not create studio assessment' }, status: :unprocessable_entity
        end
    end

    def update
        if @studio_assessment.update(studio_assessment_params)
            render json: @studio_assessment, status: :ok
        else
            render json: { error: 'Could not update studio assessment' }, status: :unprocessable_entity
        end
    end

    def destroy
        if @studio_assessment.destroy
            render json: @studio_assessment, status: :ok
        else
            render json: { error: 'Failed to delete studio assessment' }, status: :unprocessable_entity
        end
    end

    def user_not_authorized
        render json: { error: 'You are not authorized to perform this action' }, status: :unauthorized
    end

    private

    def set_studio_assessment
        @studio_assessment = authorize StudioAssessment.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'Could not find studio assessment' }, status: :not_found
    end

    def studio_assessment_params
        case_notes_param = params.require(:case_note).permit(:name,
                                                            :participant_id,
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
                                                            :problemsolvingalt_score
                                                            :problemsolvingalt_comment,
                                                            :passed_capstone,
                                                            :capstone_comment,
                                                            :proctor,
                                                            :assessment_category)
    end
end