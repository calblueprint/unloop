class ActionItem < ApplicationRecord
    has_many :assignments
    
    validates :title, :description, presence: true
end
