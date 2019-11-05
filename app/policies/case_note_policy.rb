class CaseNotePolicy < ApplicationPolicy
  class Scope < Scope
    # The first argument is a user. In your controller, Pundit will call the current_user method 
    # to retrieve what to send into this argument.
    # The second argument is a scope of some kind on which to perform some kind of query. 
    # It will usually be an ActiveRecord class or a ActiveRecord::Relation.
    def resolve
      if user.staff?
        scope.all
      else
        scope.where(participant_id: user.participant.id, internal: false)
      end
    end
  end

  def index?
    user.staff?
  end

  def create?
    user.staff?
  end

  def update?
    user.staff?
  end

  def destroy?
    user.staff?
  end

  def show?
    user.staff? || (user.participant? && user.participant.id == resource.participant_id && resource.internal == false)
  end

  def internal
    user.staff?
  end
end
