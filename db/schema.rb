# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.


ActiveRecord::Schema.define(version: 2020_03_06_060137) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_items", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.boolean "is_template", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "assignments", force: :cascade do |t|
    t.boolean "completed", default: false
    t.bigint "action_item_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "assigned_by_id"
    t.bigint "assigned_to_id"
    t.datetime "due_date"
    t.index ["action_item_id"], name: "index_assignments_on_action_item_id"
    t.index ["assigned_by_id"], name: "index_assignments_on_assigned_by_id"
    t.index ["assigned_to_id"], name: "index_assignments_on_assigned_to_id"
  end

  create_table "case_notes", force: :cascade do |t|
    t.string "description"
    t.boolean "internal"
    t.bigint "staff_id", null: false
    t.bigint "participant_id", null: false
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["participant_id"], name: "index_case_notes_on_participant_id"
    t.index ["staff_id"], name: "index_case_notes_on_staff_id"
  end

  create_table "paperworks", force: :cascade do |t|
    t.string "link"
    t.string "title"
    t.boolean "agree", default: false
    t.bigint "staff_id", null: false
    t.bigint "participant_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "viewed", default: false
    t.index ["participant_id"], name: "index_paperworks_on_participant_id"
    t.index ["staff_id"], name: "index_paperworks_on_staff_id"
  end

  create_table "participants", force: :cascade do |t|
    t.integer "status", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_participants_on_user_id"
  end

  create_table "personal_questionnaires", force: :cascade do |t|
    t.string "contact_info"
    t.string "emergency_contact"
    t.string "doc_status"
    t.string "housing"
    t.string "mental_health"
    t.string "medical"
    t.string "transportation"
    t.string "clothing"
    t.string "significant_relationships"
    t.string "support_systems"
    t.string "doc_regulations"
    t.string "treatment"
    t.string "triggers_and_prevention"
    t.string "personal_needs"
    t.string "success_tools"
    t.string "personal_goals"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "participant_id", null: false
    t.index ["participant_id"], name: "index_personal_questionnaires_on_participant_id"
  end

  create_table "professional_questionnaires", force: :cascade do |t|
    t.string "course_completion"
    t.string "work_history"
    t.string "job_search_materials"
    t.string "professional_goals"
    t.datetime "skills_assessment_date"
    t.string "barriers"
    t.string "mentorship_interest"
    t.string "success_strategies"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "participant_id", null: false
    t.index ["participant_id"], name: "index_professional_questionnaires_on_participant_id"
  end

  create_table "staffs", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_staffs_on_user_id"
  end

  create_table "studio_assessments", force: :cascade do |t|
    t.integer "bigpicture_score"
    t.string "bigpicture_comment"
    t.integer "progfundamentals_score"
    t.string "progfundamentals_comment"
    t.integer "versioncontrol_score"
    t.string "versioncontrol_comment"
    t.integer "react_score"
    t.string "react_comment"
    t.integer "node_score"
    t.string "node_comment"
    t.integer "db_score"
    t.string "db_comment"
    t.integer "problemsolving_score"
    t.string "problemsolving_comment"
    t.integer "problemsolvingalt_score"
    t.string "problemsolvingalt_comment"
    t.boolean "passed_capstone"
    t.string "capstone_comment"
    t.string "assessment_type"
    t.bigint "staff_id", null: false
    t.bigint "participant_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["participant_id"], name: "index_studio_assessments_on_participant_id"
    t.index ["staff_id"], name: "index_studio_assessments_on_staff_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_type", null: false
    t.string "first_name"
    t.string "last_name"
    t.boolean "admin", default: false
    t.string "provider"
    t.string "uid"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "assignments", "action_items"
  add_foreign_key "case_notes", "participants"
  add_foreign_key "case_notes", "staffs"
  add_foreign_key "paperworks", "participants"
  add_foreign_key "paperworks", "staffs"
  add_foreign_key "participants", "users"
  add_foreign_key "personal_questionnaires", "participants"
  add_foreign_key "professional_questionnaires", "participants"
  add_foreign_key "staffs", "users"
  add_foreign_key "studio_assessments", "participants"
  add_foreign_key "studio_assessments", "staffs"
end
