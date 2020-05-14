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
        staff? or (user.participant? and (user.id == resource.participant.id))
    end

    def index?
      staff?
    end

    private

    def staff?
      user.present? && user.staff?
    end
  end
