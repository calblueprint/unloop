class AddFirstAndLastNameOmniuser < ActiveRecord::Migration[6.0]
  def change
    remove_column :omniusers, :name
    add_column :omniusers, :first_name, :string
    add_column :omniusers, :last_name, :string

  end
end
