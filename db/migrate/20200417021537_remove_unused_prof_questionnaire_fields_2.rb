class RemoveUnusedProfQuestionnaireFields < ActiveRecord::Migration[6.0]
  def change
    remove_column :professional_questionnaires, :skills_assessment_date, :string
    remove_column :professional_questionnaires, :mentorship_interest, :string
  end
end
