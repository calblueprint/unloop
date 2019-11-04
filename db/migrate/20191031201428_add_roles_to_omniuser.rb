class AddRolesToOmniuser < ActiveRecord::Migration[6.0]
  def change
    remove_column :omniusers, :user_type
    add_column :omniusers, :user_type, :integer, null: false
    add_column :omniusers, :admin, :boolean, default: false
  end
end
