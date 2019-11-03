class Participant < ApplicationRecord
  belongs_to :user
  has_many :casenotes
  has_many :paperworks

  has_one :personal_questionnaire
  has_one :professional_questionnaire

  enum status: { r0: 0, r1: 1, r2: 2, studio: 3 }

  validates :status, presence: true

  delegate :first_name, to: :user
  delegate :last_name, to: :user
  delegate :email, to: :user
end
