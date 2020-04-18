class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :completed, :due_date, :participant_id, :staff_id, :action_item

  belongs_to :participant_id, serializer: SimpleUserSerializer
  belongs_to :staff_id, serializer: SimpleStaffSerializer
  belongs_to :action_item, serializer: ActionItemSerializer

end
