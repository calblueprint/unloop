class PersonalQuestionnaireSerializer < ActiveModel::Serializer
    attributes :id,
    :contact_info,
    :emergency_contact,
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
    :success_tools,
    :personal_goals,
    :participant

    # belongs_to :staff, serializer: SimpleStaffSerializer
    belongs_to :participant, serializer: SimpleParticipantSerializer
  end
  