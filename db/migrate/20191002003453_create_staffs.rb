class CreateStaffs < ActiveRecord::Migration[6.0]
  def change
    create_table :staffs do |t|
      t.timestamps
    end
  end
end
