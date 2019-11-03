class Staff < ApplicationRecord
  belongs_to :user
  has_many :casenotes
  has_many :paperworks

  delegate :first_name, to: :user
  delegate :last_name, to: :user
  delegate :email, to: :user
end
