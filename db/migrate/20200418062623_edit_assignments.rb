class EditAssignments < ActiveRecord::Migration[6.0]
  def change
    add_reference :assignments, :staff, null: false, foreign_key: true
    add_reference :assignments, :participant, null: false, foreign_key: true
    remove_column :assignments, :assigned_by_id
    remove_column :assignments, :assigned_to_id
  end
end
