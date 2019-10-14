class CreateProfessionalQuestionnaires < ActiveRecord::Migration[6.0]
  def change
    create_table :professional_questionnaires do |t|
      t.string :course_completion
      t.string :work_history
      t.string :job_search_materials
      t.string :professional_goals
      t.datetime :skills_assessment_date
      t.string :barriers
      t.string :mentorship_interest
      t.string :success_strategies
      t.timestamps
    end
  end
end
