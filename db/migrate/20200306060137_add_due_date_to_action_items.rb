class AddDueDateToActionItems < ActiveRecord::Migration[6.0]
  def change
    add_column :action_items, :due_date, :datetime
  end
end
