# omniuser is the parent user type of staff and participants
# it allows for google authentication with both user types, staff and participant
# it has a type column which allows us to identify if the user is a staff member or participant
# staffs and participants inherit from omniusers

class Omniuser < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  enum user_type: { participant: 0, staff: 1 }

  has_one :participant
  has_one :staff

  validates :user_type, presence: true
  validates :admin, exclusion: { in: [true] }, if: -> { !staff? }

  def self.from_omniauth(access_token)
    data = access_token.info
    omniuser = Omniuser.find_by(email: data['email'])

    unless omniuser
      omniuser = Omniuser.create(
        first_name: data['first_name'],
        last_name: data['last_name'],
        email: data['email'],
        password: Devise.friendly_token[0,20]
      )
    end
    omniuser
  end


end
