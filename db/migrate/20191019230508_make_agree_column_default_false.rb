class MakeAgreeColumnDefaultFalse < ActiveRecord::Migration[6.0]
  def up
    change_column :paperworks, :agree, :boolean, default: false
  end

  def down
    change_column :paperworks, :agree, :boolean, default: nil
  end
end
