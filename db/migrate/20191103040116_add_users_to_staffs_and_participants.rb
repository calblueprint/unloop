class AddUsersToStaffsAndParticipants < ActiveRecord::Migration[6.0]
  def change
    add_reference :staffs, :user, null: false, foreign_key: true
    add_reference :participants, :user, null: false, foreign_key: true
  end
end
