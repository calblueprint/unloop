class AddNameToOmniuser < ActiveRecord::Migration[6.0]
  def change
    add_column :omniusers, :name, :string
  end
end
