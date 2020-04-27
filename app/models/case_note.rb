class CaseNote < ApplicationRecord
  belongs_to :staff
  belongs_to :participant

  validates :title, presence: true

  rails_admin do
    object_label_method do
      :title_with_association
    end
    list do
      field :id
      field :title
      field :description
      field :visible
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
        field :visible
      end
    end
  end

  def title_with_association
    if self.participant
      "#{title} for #{self.participant.full_name}"
    end
  end
end
