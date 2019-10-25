class PaperworkSerializer < ActiveModel::Serializer
  attributes :id, :title, :link, :agree, :staff, :participant

  belongs_to :staff, serializer: SimpleStaffSerializer
  belongs_to :participant, serializer: SimpleParticipantSerializer
end
