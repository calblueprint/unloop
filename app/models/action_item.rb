class ActionItem < ApplicationRecord
    has_many :assignments
    
    validates :title, :description, :is_template, presence: true
end
