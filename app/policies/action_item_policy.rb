class ActionItemPolicy < ApplicationPolicy
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
      staff?
    end

    private

    def staff?
      user.present? && user.staff?
    end
  end