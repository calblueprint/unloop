class AddTypeToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :omniusers, :type, :string
  end
end
