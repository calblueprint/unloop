class ParticipantPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
    user.staff?
  end

  def dashboard?
    user.participant?
  end

  def statuses?
    user.staff?
  end
end
