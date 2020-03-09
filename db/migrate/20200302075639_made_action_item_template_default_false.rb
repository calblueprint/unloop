class MadeActionItemTemplateDefaultFalse < ActiveRecord::Migration[6.0]
  def change
    change_column_default :action_items, :is_template, false
  end
end
