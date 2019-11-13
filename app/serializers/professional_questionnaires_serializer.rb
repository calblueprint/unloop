class ProfessionalQuestionnairesSerializer < ActiveModel::Serializer
    attributes :id, :course_completion,
    :work_history, :job_search_materials, :professional_goals, :skills_assessment_date, 
    :barriers, :mentorship_interest,:success_strategies, :participant
  
    belongs_to :staff, serializer: SimpleStaffSerializer
    belongs_to :participant, serializer: SimpleParticipantSerializer
  end
  