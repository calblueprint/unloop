# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
    staff_member = Omniuser.create!(first_name: "Unloop",
                                    last_name: "Staff",
                                    email: "unloopauth@gmail.com",
                                    user_type: "Staff",
                                    password: "staffs")
    staff_member.create_staff!()
    participant_member = Omniuser.create!(first_name: "Unloop",
                                          last_name: "Participant",
                                          email: "unlooptestparticipant@gmail.com",
                                          user_type: "Participant",
                                          password: "participant")
    participant_member.create_participant!()
