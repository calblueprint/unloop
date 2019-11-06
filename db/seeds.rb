# Constants
NUM_STAFF = 10
NUM_PARTICIPANTS = 30
NUM_PAPERWORKS = 25
NUM_CASE_NOTES = 25
NUM_PERSONAL_QUESTIONNAIRE = 25
NUM_PROF_QUESTIONNAIRE = 25

STAFF_START_ID = Staff.count + 1
STAFF_END_ID = STAFF_START_ID + NUM_STAFF - 1
PARTICIPANT_START_ID = Participant.count + 1
PARTICIPANT_END_ID = PARTICIPANT_START_ID + NUM_PARTICIPANTS - 1

# Use Faker gem to randomly generate fields
require 'faker'

def create_admin
  unless User.exists?(email: 'admin@example.com')
    User.create!(
      email: 'admin@example.com',
      first_name: 'Admin',
      last_name: 'Staff',
      password: 'password',
      password_confirmation: 'password',
      user_type: 1,
      admin: true
    )
    puts 'Created Staff Admin'
  end
end

def create_staff
  STAFF_START_ID.upto(STAFF_END_ID) do |i|
    User.create!(
      email: "staff#{i}@gmail.com",
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      password: 'password',
      password_confirmation: 'password',
      user_type: 1
    )
  end
  puts "Created Staff ##{STAFF_START_ID}-#{STAFF_END_ID}"
end

def create_participants
  PARTICIPANT_START_ID.upto(PARTICIPANT_END_ID) do |i|
    User.create!(
      email: "participant#{i}@gmail.com",
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      password: 'password',
      password_confirmation: 'password',
      user_type: 0
    )
  end
  puts "Created Participant ##{PARTICIPANT_START_ID}-#{PARTICIPANT_END_ID}"
end

def create_paperworks
  1.upto(NUM_PAPERWORKS) do |i|
    Paperwork.create!(title: Faker::Job.title,
                      link: Faker::Internet.url,
                      agree: Faker::Boolean.boolean,
                      staff_id: Faker::Number.between(from: STAFF_START_ID, to: STAFF_END_ID),
                      participant_id: Faker::Number.between(from: PARTICIPANT_START_ID, to: PARTICIPANT_END_ID)
                    )
  end
  puts "Created #{NUM_PAPERWORKS} Paperworks"
end

def create_case_notes
  1.upto(NUM_CASE_NOTES) do |i|
    CaseNote.create!(title: Faker::Job.title,
                     description: Faker::Hipster.paragraph,
                     internal: Faker::Boolean.boolean,
                     staff_id: Faker::Number.between(from: STAFF_START_ID, to: STAFF_END_ID),
                     participant_id: Faker::Number.between(from: PARTICIPANT_START_ID, to: PARTICIPANT_END_ID)
                    )
  end
  puts "Created #{NUM_CASE_NOTES} Case Notes"
end

def create_questionnaires
  1.upto(NUM_PERSONAL_QUESTIONNAIRE) do |i|
    # PersonalQuestionnaire.create!()
  end
end

def create_google_accounts
  unless User.exists?(email: 'unloopauth@gmail.com')
    User.create!(
      email: "unloopauth@gmail.com",
      first_name: "UnloopGoogle",
      last_name: "Staff",
      user_type: 1,
    )
    puts 'Created Google staff user'
  end
  unless User.exists?(email: 'unlooptestparticipant@gmail.com')
    User.create!(
      email: "unlooptestparticipant@gmail.com",
      first_name: "UnloopGoogle",
      last_name: "Participant",
      user_type: 0,
    )
    puts 'Created Google participant user'
  end
end


create_staff
create_participants
create_paperworks
create_case_notes
create_admin
create_google_accounts
create_questionnaires
