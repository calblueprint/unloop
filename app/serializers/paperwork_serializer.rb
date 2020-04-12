class PaperworkSerializer < ActiveModel::Serializer
  attributes :id, :title, :link, :agree, :staff, :participant, :viewed, :created_at, :updated_at

  belongs_to :staff, serializer: SimpleStaffSerializer
  belongs_to :participant, serializer: SimpleParticipantSerializer
end
