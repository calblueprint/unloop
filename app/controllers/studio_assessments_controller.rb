class StudioAssessmentsController < ApplicationController
  # GET /studio_assessments
  # GET /studio_assessments.json
  def index
    @studio_assessments = authorize StudioAssessment.all
    @studio_list = []
    @studio_assessments.each do |s|
      curr = {
        "name" => s.participant.full_name,
        "bigpicture_score" => s.bigpicture_score,
        "progfundamentals_score" => s.progfundamentals_score,
        "versioncontrol_score" => s.versioncontrol_score,
        "react_score" => s.react_score,
        "node_score" => s.node_score,
        "db_score" =>s.db_score,
        "problemsolving_score" => s.problemsolving_score,
        "problemsolvingalt_score" => s.problemsolvingalt_score,
        "participant_id" => s.participant_id,
        "id" => s.id,
        "updated_date" => s.updated_at.utc.strftime('%m/%d/%Y'),
      }
      @studio_list.push(curr)
    end 
    
  end
end
