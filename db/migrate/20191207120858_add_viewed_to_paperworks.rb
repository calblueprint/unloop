class AddViewedToPaperworks < ActiveRecord::Migration[6.0]
  def change
    add_column :paperworks, :viewed, :boolean, default: false
  end
end
