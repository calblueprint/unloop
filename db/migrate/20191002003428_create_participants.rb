class CreateParticipants < ActiveRecord::Migration[6.0]
  def change
    create_table :participants do |t|
      t.string :name
      t.string :google_token
      t.string :google_refresh_token
      t.string :email
      t.integer :status, default: 0
      t.timestamps
    end
  end
end
