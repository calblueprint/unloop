class ChangeBirthdateDatatype < ActiveRecord::Migration[6.0]
  def change
    change_column :personal_questionnaires, :birthdate, :date
  end
end
