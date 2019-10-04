class CreatePaperworks < ActiveRecord::Migration[6.0]
  def change
    create_table :paperworks do |t|
      t.references :staff, null: false, foreign_key: true
      t.string :link
      t.string :title
      t.boolean :agree

      t.timestamps
    end
  end
end
