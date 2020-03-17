class StudioAssessmentSerializer < ActiveModel::Serializer
  attributes :id, :participant_id, :staff_id, :bigpicture_score, :bigpicture_comment, :progfundamentals_score, :progfundamentals_comment, :versioncontrol_score, :versioncontrol_comment, :react_score, :react_comment, :node_score, :node_comment, :db_score, :db_comment, :problemsolving_score, :problemsolving_comment, :problemsolvingalt_score, :problemsolvingalt_comment, :passed_capstone, :capstone_comment, :assessment_type
end
