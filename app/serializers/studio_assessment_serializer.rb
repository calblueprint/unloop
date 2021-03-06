class StudioAssessmentSerializer < ActiveModel::Serializer
  attributes :id, :participant_id, :staff_id, :bigpicture_score, :bigpicture_comment, :progfundamentals_score, :progfundamentals_comment, 
             :versioncontrol_score, :versioncontrol_comment, :react_score, :react_comment, :node_score, :node_comment, :db_score, :db_comment, 
             :problemsolving_score, :problemsolving_comment, :problemsolvingalt_score, :problemsolvingalt_comment, :capstone_passed, :capstone_comment, 
             :assessment_type, :participant_name, :created_at, :updated_at

  def participant_name
    object.participant.full_name
  end
end
