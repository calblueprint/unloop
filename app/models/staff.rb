class Staff < ApplicationRecord
  belongs_to :omniuser
  has_many :casenotes
  has_many :paperworks

  delegate :first_name, to: :omniuser
  delegate :last_name, to: :omniuser
  delegate :email, to: :omniuser
end
