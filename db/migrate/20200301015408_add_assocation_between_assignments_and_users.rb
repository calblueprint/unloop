class AddAssocationBetweenAssignmentsAndUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :assignments, :assigned_by, references: :staffs, index: true
    add_foreign_key :assignments, :staffs, column: :assigned_by_id

    add_reference :assignments, :assigned_to, references: :users, index: true
    add_foreign_key :assignments, :users, column: :assigned_to_id
    # add_reference :assignments, :assigned_by, foreign_key: { to_table: 'Staff'}
    # add_reference :assignments, :assigned_to, foreign_key: { to_table: 'User' }
  end
end
