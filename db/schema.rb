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

ActiveRecord::Schema.define(version: 2019_10_07_034933) do

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
end
