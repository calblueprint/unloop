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

ActiveRecord::Schema.define(version: 2019_10_11_034834) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "casenotes", force: :cascade do |t|
    t.string "description"
    t.boolean "internal"
    t.bigint "staff_id", null: false
    t.bigint "participant_id", null: false
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["participant_id"], name: "index_casenotes_on_participant_id"
    t.index ["staff_id"], name: "index_casenotes_on_staff_id"
  end

  create_table "paperworks", force: :cascade do |t|
    t.string "link"
    t.string "title"
    t.boolean "agree"
    t.bigint "staff_id", null: false
    t.bigint "participant_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["participant_id"], name: "index_paperworks_on_participant_id"
    t.index ["staff_id"], name: "index_paperworks_on_staff_id"
  end

  create_table "participants", force: :cascade do |t|
    t.string "name"
    t.string "google_token"
    t.string "google_refresh_token"
    t.string "email"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
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
    t.string "name"
    t.string "email"
    t.string "google_token"
    t.string "google_refresh_token"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "casenotes", "participants"
  add_foreign_key "casenotes", "staffs"
  add_foreign_key "paperworks", "participants"
  add_foreign_key "paperworks", "staffs"
  add_foreign_key "personal_questionnaires", "participants"
  add_foreign_key "professional_questionnaires", "participants"
end
