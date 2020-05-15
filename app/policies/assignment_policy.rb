class AssignmentPolicy < ApplicationPolicy
    def create?
      staff?
    end
  
    def update?
      staff?
    end
  
    def destroy?
        staff?
    end

    def show?
        staff? or (user.participant? and (user.participant.id == resource.participant.id))
    end

    def index?
      staff?
    end

    def complete?
      staff? or (user.participant? and (user.participant.id == resource.participant.id))
    end

    class Scope < Scope
      def resolve
        if user.staff?
            scope.all
        else
            scope.where(participant_id: user.participant.id)
        end
      end
    end
      
    private

    def staff?
      user.present? && user.staff?
    end
  end
