class Paperwork < ApplicationRecord
  belongs_to :staff
  belongs_to :participant

  validates :title, :link, presence: true

  rails_admin do
    list do
      field :title
      field :link
      field :agree
      field :participant
      field :staff
      field :created_at
      field :updated_at
    end
    edit do
      group :default do
        label 'Paperwork Information'
        field :title
        field :link
        field :participant
        field :staff
        field :agree
      end
    end
  end
end
