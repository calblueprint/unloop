class StudioAssessmentsController < ApplicationController
  before_action :set_studio_assessment, only: [:show, :edit, :update, :destroy]

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

  # POST /studio_assessments
  # POST /studio_assessments.json
  def create
    @studio_assessment = StudioAssessment.new(studio_assessment_params)

    respond_to do |format|
      if @studio_assessment.save
        format.html { redirect_to @studio_assessment, notice: 'Studio assessment was successfully created.' }
        format.json { render :show, status: :created, location: @studio_assessment }
      else
        format.html { render :new }
        format.json { render json: @studio_assessment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /studio_assessments/1
  # PATCH/PUT /studio_assessments/1.json
  def update
    respond_to do |format|
      if @studio_assessment.update(studio_assessment_params)
        format.html { redirect_to @studio_assessment, notice: 'Studio assessment was successfully updated.' }
        format.json { render :show, status: :ok, location: @studio_assessment }
      else
        format.html { render :edit }
        format.json { render json: @studio_assessment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /studio_assessments/1
  # DELETE /studio_assessments/1.json
  def destroy
    @studio_assessment.destroy
    respond_to do |format|
      format.html { redirect_to studio_assessments_url, notice: 'Studio assessment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_studio_assessment
      @studio_assessment = StudioAssessment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def studio_assessment_params
      params.require(:studio_assessment).permit(:name, :participant_id, :bigpicture_score, :bigpicture_comment, :progfundamentals_score, :progfundamentals_comment, :versioncontrol_score, :versioncontrol_comment, :react_score, :react_comment, :node_score, :node_comment, :db_score, :db, :problemsolving_score, :problemsolving_comment, :problemsolvingalt_score, :problemsolvingalt_comment, :passed_capstone, :capstone_comment, :proctor, :assessment_type)
    end
end
