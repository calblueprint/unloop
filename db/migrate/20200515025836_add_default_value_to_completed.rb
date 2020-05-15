class AddDefaultValueToCompleted < ActiveRecord::Migration[6.0]
  def change
    change_column_default :assignments, :completed_staff, false
  end
end
