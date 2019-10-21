class ConnectStaffAndOmniuser < ActiveRecord::Migration[6.0]
  def change
    change_table :staffs do |t|
      t.references :omniuser, null: false, foreign_key: true
    end

    change_table :participants do |t|
      t.references :omniuser, null: true, foreign_key: true
    end
  end

end
