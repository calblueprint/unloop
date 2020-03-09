class CreateStudioAssessments < ActiveRecord::Migration[6.0]
  def change
    create_table :studio_assessments do |t|
      t.integer :bigpicture_score
      t.string :bigpicture_comment
      t.integer :progfundamentals_score
      t.string :progfundamentals_comment
      t.integer :versioncontrol_score
      t.string :versioncontrol_comment
      t.integer :react_score
      t.string :react_comment
      t.integer :node_score
      t.string :node_comment
      t.integer :db_score
      t.string :db_comment
      t.integer :problemsolving_score
      t.string :problemsolving_comment
      t.integer :problemsolvingalt_score
      t.string :problemsolvingalt_comment
      t.boolean :passed_capstone
      t.string :capstone_comment
      t.string :assessment_type
      t.references :staff, null: false, foreign_key: true
      t.references :participant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
