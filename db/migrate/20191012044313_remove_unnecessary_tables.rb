class RemoveUnnecessaryTables < ActiveRecord::Migration[6.0]
  def change
    remove_column :participants, :google_token
    remove_column :participants, :google_refresh_token
    remove_column :participants, :name
    remove_column :participants, :encrypted_password
    remove_column :participants, :reset_password_sent_at
    remove_column :participants, :email

    remove_column :staffs, :name
    remove_column :staffs, :google_token
    remove_column :staffs, :google_refresh_token
    remove_column :staffs, :encrypted_password
    remove_column :staffs, :reset_password_sent_at
    remove_column :staffs, :email

  end
end
