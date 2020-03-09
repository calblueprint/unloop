class CreateAssignments < ActiveRecord::Migration[6.0]
  def change
    create_table :assignments do |t|
      t.boolean :completed, default: false
      t.references :action_item, null: false, foreign_key: true
      t.timestamps
    end
  end
end
