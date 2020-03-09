class ActionItem < ApplicationRecord
    has_many :assignments

    validates :title, :description, presence: true
    validates :is_template, inclusion: [true, false]
end
