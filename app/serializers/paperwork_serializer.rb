class PaperworkSerializer < ActiveModel::Serializer
  attributes :id, :title, :link, :agree, :staff, :participant

  belongs_to :staff, serializer: Paperwork::PaperworkStaffSerializer
  belongs_to :participant, serializer: Paperwork::PaperworkParticipantSerializer
end
