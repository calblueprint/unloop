class CasenoteSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :internal, :staff, :participant

  belongs_to :staff, serializer: SimpleStaffSerializer
  belongs_to :participant, serializer: SimpleParticipantSerializer
end
