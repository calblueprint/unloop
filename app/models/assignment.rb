class Assignment < ApplicationRecord
    belongs_to :action_item
    belongs_to :staff
    belongs_to :participant
    
    validates :action_item, :staff_id, :participant_id, presence: true
    validates :completed_staff, inclusion: [true, false]
    validates :completed_participant, inclusion: [true, false]
    validate :nontemplate_assignment, on: [:create, :update, :save]

    def cond_assignment_title
        action_item.title unless action_item.nil?
    end

    def cond_assignment_description
        action_item.description unless action_item.nil?
    end

    private 
    def nontemplate_assignment
        if action_item.is_template
            errors.add(:participant_id, "Template action items can not be assigned assignments. Create a copy. ")
        end
    end
end
