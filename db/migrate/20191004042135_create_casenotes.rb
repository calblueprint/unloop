class CreateCasenotes < ActiveRecord::Migration[6.0]
  def change
    create_table :casenotes do |t|
      t.string :description
      t.boolean :internal
      t.references :staff, null: false, foreign_key: true
      t.references :participant, null: false, foreign_key: true
      t.string :title

      t.timestamps
    end
  end
end
