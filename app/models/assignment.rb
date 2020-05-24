class Assignment < ApplicationRecord
    belongs_to :action_item
    belongs_to :staff
    belongs_to :participant
    
    validates :action_item, :staff_id, :participant_id, presence: true
    validates :completed_staff, inclusion: [true, false]
    validates :completed_participant, inclusion: [true, false]
    validate :nontemplate_assignment, on: [:create, :update, :save]

    delegate :title, to: :action_item
    delegate :description, to: :action_item
    delegate :category, to: :action_item
    delegate :fileURL, to: :action_item
  
    private 
    def nontemplate_assignment
        if action_item.is_template
            errors.add(:participant_id, "Template action items can not be assigned assignments. Create a copy. ")
        end
    end
end
