class AddCategoryToActionItems < ActiveRecord::Migration[6.0]
  def change
    add_column :action_items, :category, :integer
  end
end
