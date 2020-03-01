# User is the parent user type of staff and participants
# it allows for google authentication with both user types, staff and participant
# it has a user_type column which allows us to identify if the user is a staff member or participant
# staffs and participants inherit from users
class User < ApplicationRecord
  # We want to remove database_authenticatable during production
  # Keeping it for easy testing
  devise :database_authenticatable,
         :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  enum user_type: { participant: 0, staff: 1 }

  has_one :participant, dependent: :destroy
  has_one :staff, dependent: :destroy
  has_many :action_items_assigned_by , class_name: 'Assignment', foreign_key: "assigned_by_id"
  has_many :action_items_assigned_to, class_name: 'Assignment', foreign_key: "assigned_to_id"

  validates :email, :user_type, presence: true
  validates :admin, exclusion: { in: [true], message: 'Only staff can be admin' }, if: :not_staff?

  before_validation :generate_password, on: :create
  after_create :create_child_model

  def self.from_omniauth(auth)
    data = auth.info
    user = User.find_by(email: data['email'])

    if user && !(user.provider && user.uid)
      user&.update(
        provider: auth.provider,
        uid: auth.uid,
        first_name: data.first_name,
        last_name: data.last_name
      )
    end
    user
  end

  rails_admin do
    weight -2
    object_label_method do
      :full_name
    end
    list do
      field :id
      field :email
      field :user_type
      field :staff
      field :participant
      field :admin
      field :provider
      field :created_at
      field :updated_at
    end
    edit do
      group :default do
        label 'User Information'
        field :email
        field :user_type
        field :first_name
        field :last_name
        field :admin do
          help 'Only staffs can be admin'
        end
      end
    end
    show do
      group :default do
        field :email
        field :participant
        field :user_type
        field :first_name
        field :last_name
        field :staff
        field :admin
      end
      group :oauth do
        label 'oAuth Information'
        field :provider
        field :uid
      end
    end
  end

  def full_name
    "#{first_name} #{last_name}"
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
