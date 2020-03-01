class Assignment < ApplicationRecord
    belongs_to :action_item
    belongs_to :assigned_by, class_name: 'User'
    belongs_to :assigned_to, class_name: 'User'
end
