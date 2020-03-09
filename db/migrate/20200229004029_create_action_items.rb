class CreateActionItems < ActiveRecord::Migration[6.0]
  def change
    create_table :action_items do |t|
      t.string :title
      t.text :description
      t.boolean :is_template
      t.timestamps
    end
  end
end
