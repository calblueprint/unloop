class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :category, :completed_participant, 
             :completed_staff, :due_date, :participant_id, :staff_id, :action_item_id,
             :fileURL
end
