class ProfessionalQuestionnairesSerializer < ActiveModel::Serializer
  attributes :id, :course_completion,
  :work_history, :job_search_materials, :professional_goals, 
  :barriers,:success_strategies, :education_history, :begin_skills_assessment_date, :end_skills_assessment_date,
  :assigned_mentor, :participant

  belongs_to :participant, serializer: SimpleParticipantSerializer
end
  