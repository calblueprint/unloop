class ModifyProfessionalQuestionnaire < ActiveRecord::Migration[6.0]
  add_column :professional_questionnaires, :education_history, :string
  add_column :professional_questionnaires, :begin_skills_assessment_date, :datetime
  add_column :professional_questionnaires, :end_skills_assessment_date, :datetime
  add_column :professional_questionnaires, :assigned_mentor, :string
end
