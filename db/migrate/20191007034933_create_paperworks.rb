class CreatePaperworks < ActiveRecord::Migration[6.0]
  def change
    create_table :paperworks do |t|
      t.string :link
      t.string :title
      t.boolean :agree, default: false
      t.references :staff, null: false, foreign_key: true
      t.references :participant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
