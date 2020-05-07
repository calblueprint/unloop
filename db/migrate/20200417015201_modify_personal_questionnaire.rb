class ModifyPersonalQuestionnaire < ActiveRecord::Migration[6.0]
  def change
    remove_column :personal_questionnaires, :contact_info, :string
    remove_column :personal_questionnaires, :emergency_contact, :string
    remove_column :personal_questionnaires, :success_tools, :string
    add_column :personal_questionnaires, :birthdate, :datetime
    add_column :personal_questionnaires, :phone_number, :string
    add_column :personal_questionnaires, :pronouns, :string
    add_column :personal_questionnaires, :race_and_ethnicities, :string
    add_column :personal_questionnaires, :drivers_license_status, :string
    add_column :personal_questionnaires, :emergency_contact_name, :string
    add_column :personal_questionnaires, :emergency_contact_phone_number, :string
    add_column :personal_questionnaires, :emergency_contact_relationship, :string
    add_column :personal_questionnaires, :emergency_contact_2_name, :string
    add_column :personal_questionnaires, :emergency_contact_2_phone_number, :string
    add_column :personal_questionnaires, :emergency_contact_2_relationship, :string
    add_column :personal_questionnaires, :financial_obligations, :string
    add_column :personal_questionnaires, :resources_allocated, :string
    add_column :personal_questionnaires, :orca_card, :string
    add_column :personal_questionnaires, :state_assistance, :string
  end
end
