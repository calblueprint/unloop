class CreatePaperworks < ActiveRecord::Migration[6.0]
  def change
    create_table :paperworks do |t|
      t.references :staff, null: false, foreign_key: true
      t.references :participant, null: false, foreign_key: true
      t.string :link, null: false
      t.string :title, null: false
      t.boolean :agree

      t.timestamps
    end
  end
end
