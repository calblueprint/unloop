class AddDueDateToAssignments < ActiveRecord::Migration[6.0]
  def change
    add_column :assignments, :due_date, :datetime
  end
end
