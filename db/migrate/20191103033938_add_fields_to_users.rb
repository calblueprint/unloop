class AddFieldsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :user_type, :integer, null: false
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :admin, :boolean, default: false
  end
end
