class Assignment < ApplicationRecord
    belongs_to :action_item
    belongs_to :assigned_by, class_name: 'User'
    belongs_to :assigned_to, class_name: 'User'

    validates :assigned_by, :assigned_to, presence: true
    validate :valid_assignment, on: :create

    private 
    def valid_assignment
        if assigned_by.participant? && (!assigned_to.staff? || assigned_to == assigned_by)
            errors.add(:assigned_to, "Participant can not assign an action item to another participant")
        end
    end
end
