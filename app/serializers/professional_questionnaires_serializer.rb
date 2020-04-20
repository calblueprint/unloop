class ProfessionalQuestionnairesSerializer < ActiveModel::Serializer
  attributes :id, :course_completion,
  :work_history, :job_search_materials, :professional_goals, 
  :barriers,:success_strategies, :participant

  belongs_to :participant, serializer: SimpleParticipantSerializer
end
  