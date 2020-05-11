class ProfessionalQuestionnairesSerializer < ActiveModel::Serializer
  attributes :id, :course_completion, :education_history,
  :work_history, :job_search_materials, :professional_goals,
  :begin_skills_assessment_date, :end_skills_assessment_date,
  :barriers, :assigned_mentor, :success_strategies, :participant

  belongs_to :participant, serializer: SimpleParticipantSerializer
end
  