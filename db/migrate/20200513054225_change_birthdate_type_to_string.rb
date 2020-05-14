class ChangeBirthdateTypeToString < ActiveRecord::Migration[6.0]
  def change
    change_column :personal_questionnaires, :birthdate, :string
  end
end
