class CreatePersonalQuestionnaires < ActiveRecord::Migration[6.0]
  def change
    create_table :personal_questionnaires do |t|
      t.string :contact_info
      t.string :emergency_contact
      t.string :doc_status
      t.string :housing
      t.string :mental_health
      t.string :medical
      t.string :transportation
      t.string :clothing
      t.string :significant_relationships
      t.string :support_systems
      t.string :doc_regulations
      t.string :treatment
      t.string :triggers_and_prevention
      t.string :personal_needs
      t.string :success_tools
      t.string :personal_goals
      t.timestamps
    end
  end
end
