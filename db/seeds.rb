# Constants
NUM_STAFF = 10
NUM_PARTICIPANTS = 30
NUM_PAPERWORKS = 25
NUM_CASENOTES = 25
NUM_PERSONAL_QUESTIONNAIRE = 25
NUM_PROF_QUESTIONNAIRE = 25

STAFF_START_ID = Staff.count + 1
STAFF_END_ID = STAFF_START_ID + NUM_STAFF - 1
PARTICIPANT_START_ID = Participant.count + 1
PARTICIPANT_END_ID = PARTICIPANT_START_ID + NUM_PARTICIPANTS - 1
# PAPERWORK_START_ID = Paperwork.count + 1
# PAPERWORK_END_ID = PAPERWORK_START_ID + NUM_PAPERWORKS - 1
# CASENOTE_START_ID = Casenote.count + 1
# CASENOTE_END_ID = CASENOTE_START_ID + NUM_CASENOTES - 1
# PERSONAL_QUESTIONNAIRE_START_ID = PersonalQuestionnaire.count + 1
# PERSONAL_QUESTIONNAIRE_END_ID = PERSONAL_QUESTIONNAIRE_START_ID + NUM_PERSONAL_QUESTIONNAIRES - 1
# PROF_QUESTIONNAIRE_START_ID = ProfessionalQuestionnaire.count + 1
# PROF_QUESTIONNAIRE_END_ID = PROF_QUESTIONNAIRE_START_ID + NUM_PROF_QUESTIONNAIRES - 1

# Use Faker gem to randomly generate fields
require 'faker'

def create_admin
  Admin.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
  puts 'Created Master Admin'
end

def create_staff
  STAFF_START_ID.upto(STAFF_END_ID) do |i|
    staff = Omniuser.create!(email: "staff#{i}@gmail.com",
                             first_name: Faker::Name.first_name,
                             last_name: Faker::Name.last_name,
                             password: 'password',
                             password_confirmation: 'password',
                             user_type: 'Staff')
    staff.create_staff!
  end
  puts "Created Staff ##{STAFF_START_ID}-#{STAFF_END_ID}"
end

def create_participants
  PARTICIPANT_START_ID.upto(PARTICIPANT_END_ID) do |i|
    participant = Omniuser.create!(email: "participant#{i}@gmail.com",
                                   first_name: Faker::Name.first_name,
                                   last_name: Faker::Name.last_name,
                                   password: 'password',
                                   password_confirmation: 'password',
                                   user_type: 'Participant')
    participant.create_participant!
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

def create_casenotes
  1.upto(NUM_CASENOTES) do |i|
    Casenote.create!(title: Faker::Job.title,
                     description: Faker::Hipster.paragraph,
                     internal: Faker::Boolean.boolean,
                     staff_id: Faker::Number.between(from: STAFF_START_ID, to: STAFF_END_ID),
                     participant_id: Faker::Number.between(from: PARTICIPANT_START_ID, to: PARTICIPANT_END_ID)
                    )
  end
  puts "Created #{NUM_CASENOTES} Case Notes"
end

def create_questionnaires
  1.upto(NUM_PERSONAL_QUESTIONNAIRE) do |i|
    # PersonalQuestionnaire.create!()
  end
end

staff_member = Omniuser.create!(first_name: "Unloop",
  last_name: "Staff",
  email: "unloopauth@gmail.com",
  user_type: "Staff",
  password: "staffs")
staff_member.create_staff!
participant_member = Omniuser.create!(first_name: "Unloop",
        last_name: "Participant",
        email: "unlooptestparticipant@gmail.com",
        user_type: "Participant",
        password: "participant")
participant_member.create_participant!

create_admin
create_staff
create_participants
create_paperworks
create_casenotes
# create_questionnaires
