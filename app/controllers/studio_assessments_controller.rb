class StudioAssessmentsController < ApplicationController
  before_action :set_studio_assessment, only: [:show, :edit]

  # GET /studio_assessments
  # GET /studio_assessments.json
  def index
    @studio_assessments = StudioAssessment.all
    skip_policy_scope
  end

  # GET /studio_assessments/1
  # GET /studio_assessments/1.json
  def show
  end

  # GET /studio_assessments/new
  def new
    @studio_assessment = authorize StudioAssessment.new
    @participants = Participant.all
  end

  # GET /studio_assessments/1/edit
  def edit
    @participants = Participant.all
  end

  private
  def set_studio_assessment
    @studio_assessment = authorize StudioAssessment.find(params[:id])
  rescue ActiveRecord::RecordNotFound => exception
    Raven.extra_context(studio_assessment_id: params[:id])
    Raven.capture_exception(exception)
    redirect_to studio_assessments_path
  end
end
