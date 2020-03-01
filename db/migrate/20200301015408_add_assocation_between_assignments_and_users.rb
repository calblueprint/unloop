class AddAssocationBetweenAssignmentsAndUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :assignments, :assigned_by_id, :integer
    add_column :assignments, :assigned_to_id, :integer
  end
end
