class ChangeOmniuserTypeColumn < ActiveRecord::Migration[6.0]
  def change
    add_column :omniusers, :user_type, :string
    remove_column :omniusers, :type
  end
end
