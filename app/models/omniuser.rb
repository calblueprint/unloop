# omniuser is the parent user type of staff and participants
# it allows for google authentication with both user types
# it has a type column which allows us to identify if the user is a staff member or participant

class Omniuser < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, 
         :omniauthable, omniauth_providers: [:google_oauth2]


  # https://medium.com/@_benrudolph/end-to-end-devise-omniauth-google-api-rails-7f432b38ed75
  def self.from_omniauth(access_token)
    data = access_token.info


    omniuser = Omniuser.where(email: data['email']).first

    # Uncomment the section below if you want users to be created if they don't exist
    unless omniuser
        omniuser = Omniuser.create(
           email: data['email'],
           password: Devise.friendly_token[0,20]
        )
    end
    omniuser
  end


end
