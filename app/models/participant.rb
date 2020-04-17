class Participant < ApplicationRecord
  belongs_to :user, dependent: :destroy
  has_many :case_notes
  has_many :paperworks
  has_many :assignments
  has_many :studio_assessments

  has_many :studio_assessments

  has_one :personal_questionnaire
  has_one :professional_questionnaire

  enum status: { r0: 0, r1: 1, r2: 2, studio: 3 }

  validates :status, presence: true

  delegate :first_name, to: :user
  delegate :last_name, to: :user
  delegate :email, to: :user
  delegate :full_name, to: :user

  rails_admin do
    parent User
    weight -1
    object_label_method do
      :cond_full_name
    end
    list do
      field :id
      field :email
      field :user
      field :status
      field :case_notes
      field :paperworks
      field :studio_assessments
      field :created_at
      field :updated_at
    end
    edit do
      group :default do
        label 'Participant Information'
        field :user
        field :status
        field :case_notes
        field :paperworks
        field :studio_assessments
      end
    end
  end

  def cond_full_name
    full_name unless user.nil?
  end
end
