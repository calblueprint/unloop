class ActionItem < ApplicationRecord
    has_many :assignments
    
    validates :title, :description, :due_date, presence: true
    validates :is_template, inclusion: [true, false]
    
end
