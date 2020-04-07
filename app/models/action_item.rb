class ActionItem < ApplicationRecord
    has_many :assignments, dependent: :restrict_with_error

    validates :title, :description, presence: true
    validates :is_template, inclusion: [true, false]
end
