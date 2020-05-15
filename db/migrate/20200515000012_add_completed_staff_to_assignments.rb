class AddCompletedStaffToAssignments < ActiveRecord::Migration[6.0]
  def change
    add_column :assignments, :completed_staff, :boolean
    rename_column :assignments, :completed, :completed_participant
  end
end
