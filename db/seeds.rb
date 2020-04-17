# Constants
NUM_STAFF = 30
NUM_PARTICIPANTS = 25
NUM_PAPERWORKS = 25
NUM_CASE_NOTES = 25
NUM_PERSONAL_QUESTIONNAIRE = 25
NUM_PROF_QUESTIONNAIRE = 25
NUM_TEMPLATE_ACTION_ITEMS = 10
NUM_ACTION_ITEMS = 25
NUM_STUDIO_ASSESSMENTS = 25
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
                      viewed: Faker::Boolean.boolean,
                      staff_id: Faker::Number.between(from: STAFF_START_ID, to: STAFF_END_ID),
                      participant_id: Faker::Number.between(from: PARTICIPANT_START_ID, to: PARTICIPANT_END_ID)
                    )
  end
  puts "Created #{NUM_PAPERWORKS} Paperworks"
end

def create_template_action_items
  1.upto(NUM_TEMPLATE_ACTION_ITEMS) do |i|
    ActionItem.create(title: Faker::Hacker.noun,
                      description: Faker::Hacker.say_something_smart,
                      category: Faker::Number.between(from: 0, to: ActionItem.categories.length - 1),
                      is_template: true,
                    )
  end
  puts 'Created action item templates'
end

def create_assignments
  1.upto(NUM_ACTION_ITEMS) do |i|
    action_item = ActionItem.create!(title: Faker::Hacker.noun, 
                                     description: Faker::Hacker.say_something_smart,
                                     category: Faker::Number.between(from: 0, to: ActionItem.categories.length - 1),
                                     is_template: false,
                                    )
    1.upto(rand(1...4)) do |i|
      asignee = Staff.find(Staff.pluck(:id).sample)
      assigned = Participant.find(Participant.pluck(:id).sample)
      Assignment.create!(action_item: action_item, 
                         completed: Faker::Boolean.boolean,
                         assigned_by: asignee,
                         due_date: Faker::Time.forward(days: 365, period: :all),
                         assigned_to: assigned.user,
                        )
    end
  end
  puts 'Created assignments'
end

def create_case_notes
  1.upto(NUM_CASE_NOTES) do |i|
    CaseNote.create!(title: Faker::Job.title,
                     description: "{\"blocks\":[{\"key\":\"#{i}\",\"text\":\"#{Faker::Hipster.paragraph}\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
                     visible: Faker::Boolean.boolean,
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
      admin: true,
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

def create_studio_assesments 
  1.upto(NUM_STUDIO_ASSESSMENTS) do |i|
    StudioAssessment.create!(
      bigpicture_score: Faker::Number.between(from: 0, to: 3),
      bigpicture_comment: Faker::Cannabis.buzzword,
      progfundamentals_score: Faker::Number.between(from: 0, to: 3),
      progfundamentals_comment: Faker::Cannabis.buzzword,
      versioncontrol_score: Faker::Number.between(from: 0, to: 3),
      versioncontrol_comment: Faker::Cannabis.buzzword,
      react_score: Faker::Number.between(from: 0, to: 3),
      react_comment: Faker::Cannabis.buzzword,
      node_score: Faker::Number.between(from: 0, to: 3),
      node_comment: Faker::Cannabis.buzzword,
      db_score: Faker::Number.between(from: 0, to: 3),
      db_comment: Faker::Cannabis.buzzword,
      problemsolving_score: Faker::Number.between(from: 0, to: 3),
      problemsolving_comment:Faker::Cannabis.buzzword,
      problemsolvingalt_score: Faker::Number.between(from: 0, to: 3),
      problemsolvingalt_comment:Faker::Cannabis.buzzword,
      capstone_passed: Faker::Boolean.boolean,
      capstone_comment:Faker::Cannabis.buzzword,
      assessment_type: Faker::Hacker.say_something_smart,
      staff_id: Faker::Number.between(from: STAFF_START_ID, to: STAFF_END_ID),
      participant_id: Faker::Number.between(from: PARTICIPANT_START_ID, to: PARTICIPANT_END_ID)
    )
  end
  puts "Created #{NUM_STUDIO_ASSESSMENTS} Studio Assessments"
end

create_staff
create_participants
create_paperworks
create_case_notes
create_admin
create_google_accounts
create_questionnaires
create_template_action_items
create_assignments
create_studio_assesments