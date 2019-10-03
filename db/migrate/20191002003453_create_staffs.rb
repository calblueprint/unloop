class CreateStaffs < ActiveRecord::Migration[6.0]
  def change
    create_table :staffs do |t|
      t.string :name
      t.string :email
      t.string :google_token
      t.string :google_refresh_token
      t.timestamps
    end
  end
end
