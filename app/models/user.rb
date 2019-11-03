# User is the parent user type of staff and participants
# it allows for google authentication with both user types, staff and participant
# it has a user_type column which allows us to identify if the user is a staff member or participant
# staffs and participants inherit from users
class
   User < ApplicationRecord
  devise :database_authenticatable,
         :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  enum user_type: { participant: 0, staff: 1 }

  has_one :participant, dependent: :destroy
  has_one :staff, dependent: :destroy

  validates :email, :user_type, presence: true
  validates :admin, exclusion: { in: [true], message: 'Only staff can be admin' }, if: :not_staff?

  before_validation :generate_password, on: :create
  after_create :create_child_model

  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.find_by(email: data['email'])
    byebug
    user&.update(
      first_name: data['first_name'],
      last_name: data['last_name']
    )
    user
  end

  private

  def not_staff?
    !staff?
  end

  def generate_password
    self.password = Devise.friendly_token.first(20) if password.nil?
  end

  def create_child_model
    if staff?
      create_staff!
    elsif participant?
      create_participant!
    end
  end
end
