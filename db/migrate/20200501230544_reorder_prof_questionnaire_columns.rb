class ReorderProfQuestionnaireColumns < ActiveRecord::Migration[6.0]
  def change
    remove_column :professional_questionnaires, :course_completion, :string
    remove_column :professional_questionnaires, :work_history, :string
    remove_column :professional_questionnaires, :job_search_materials, :string
    remove_column :professional_questionnaires, :professional_goals, :string
    remove_column :professional_questionnaires, :barriers, :string
    remove_column :professional_questionnaires, :success_strategies, :string
    remove_column :professional_questionnaires, :education_history, :string
    remove_column :professional_questionnaires, :begin_skills_assessment_date, :datetime
    remove_column :professional_questionnaires, :end_skills_assessment_date, :datetime
    remove_column :professional_questionnaires, :assigned_mentor, :string
    
    add_column :professional_questionnaires, :course_completion, :string
    add_column :professional_questionnaires, :education_history, :string
    add_column :professional_questionnaires, :work_history, :string
    add_column :professional_questionnaires, :job_search_materials, :string
    add_column :professional_questionnaires, :professional_goals, :string
    add_column :professional_questionnaires, :begin_skills_assessment_date, :datetime
    add_column :professional_questionnaires, :end_skills_assessment_date, :datetime
    add_column :professional_questionnaires, :barriers, :string
    add_column :professional_questionnaires, :assigned_mentor, :string
    add_column :professional_questionnaires, :success_strategies, :string
  end
end
