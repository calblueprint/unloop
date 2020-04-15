class CaseNoteSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :visible, :staff, :participant

  belongs_to :staff, serializer: SimpleStaffSerializer
  belongs_to :participant, serializer: SimpleParticipantSerializer
end
