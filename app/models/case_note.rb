class CaseNote < ApplicationRecord
  belongs_to :staff
  belongs_to :participant

  validates :title, presence: true

  rails_admin do
    object_label_method do
      :title_with_association
    end
    list do
      field :title
      field :description
      field :internal
      field :participant
      field :staff
      field :created_at
      field :updated_at
    end
    edit do
      group :default do
        label 'Case Note Information'
        field :title
        field :description
        field :participant
        field :staff
        field :internal
      end
    end
  end

  def title_with_association
    "#{title} for #{participant.full_name}"
  end
end
