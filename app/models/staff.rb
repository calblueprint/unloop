class Staff < ApplicationRecord
    # uncomment if devise needs to be here
    # devise :database_authenticatable, :registerable,
    # :recoverable, :rememberable, :validatable
    belongs_to :omniuser
    has_many :casenotes
    has_many :paperworks

    delegate :first_name, to: :omniuser
    delegate :last_name, to: :omniuser
end
