class CreateCaseNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :case_notes do |t|
      t.string :description
      t.boolean :internal
      t.references :staff, null: false, foreign_key: true
      t.references :participant, null: false, foreign_key: true
      t.string :title

      t.timestamps
    end
  end
end
