class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :completed, :due_date, :participant_id, :staff_id, :action_item

  belongs_to :participant, serializer: SimpleParticipantSerializer
  belongs_to :staff, serializer: SimpleStaffSerializer
  belongs_to :action_item, serializer: ActionItemSerializer

end
