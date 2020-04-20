class PersonalQuestionnaireSerializer < ActiveModel::Serializer
  attributes :id,
  :emergency_contact_name,
  :doc_status,
  :housing,
  :mental_health,
  :medical,
  :transportation,
  :clothing,
  :significant_relationships,
  :support_systems,
  :doc_regulations,
  :treatment,
  :triggers_and_prevention,
  :personal_needs,
  :personal_goals,
  :participant

  belongs_to :participant, serializer: SimpleParticipantSerializer
end
