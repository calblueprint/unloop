class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :completed, :due_date, :assigned_to, :category, :assigned_by, :action_item

  belongs_to :assigned_to, serializer: SimpleUserSerializer
  belongs_to :assigned_by, serializer: SimpleStaffSerializer
  belongs_to :action_item, serializer: ActionItemSerializer

end
