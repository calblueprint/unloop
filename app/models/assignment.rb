class Assignment < ApplicationRecord
    belongs_to :action_item
    belongs_to :assigned_by, class_name: 'Staff'
    belongs_to :assigned_to, class_name: 'User'
    
    validates :action_item, :assigned_by, :assigned_to, presence: true
    validates :completed, inclusion: [true, false]
    validate :nontemplate_assignment, on: :create

    def cond_assignment_title
        action_item.title unless action_item.nil?
    end

    def cond_assignment_description
        action_item.description unless action_item.nil?
    end

    private 
    def nontemplate_assignment
        if action_item.is_template
            errors.add(:assigned_to, "Template action items can not be assigned assignments. Create a copy. ")
        end
    end
end
