class AddQuestionnaireToParticipant < ActiveRecord::Migration[6.0]
  def change
    add_reference :personal_questionnaires, :participant, null: false, foreign_key: true
    add_reference :professional_questionnaires, :participant, null: false, foreign_key: true
  end
end
