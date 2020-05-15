class ChangeBeginSkillsAssessmentDateToString < ActiveRecord::Migration[6.0]
  def change
    change_column :professional_questionnaires, :begin_skills_assessment_date, :string
    change_column :professional_questionnaires, :end_skills_assessment_date, :string
  end
end
