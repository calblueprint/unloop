class AddAssocationBetweenAssignmentsAndUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :assignments, :assigned_by, references: :staffs, index: true
    add_reference :assignments, :assigned_to, references: :users, index: true
  end
end
