class Participant < ApplicationRecord
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, 
    :omniauthable, omniauth_providers: [:google_oauth2]

    enum status: {r0: 0, r1: 1, r2: 2, studio: 3}

end
