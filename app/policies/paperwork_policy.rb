class PaperworkPolicy < ApplicationPolicy
  def index?
    user.staff?
  end

  def create?
    user.staff?
  end

  def destroy?
    user.staff?
  end

  def complete?
    user.participant? && user.participant.id == resource.participant_id
  end

  def show?
    user.staff? || (user.participant? && user.participant.id == resource.participant_id)
  end

  def update?
    user.staff?
  end

  class Scope < Scope
  # The first argument is a user. In your controller, Pundit will call the current_user method 
  # to retrieve what to send into this argument.
  # The second argument is a scope of some kind on which to perform some kind of query. 
  # It will usually be an ActiveRecord class or a ActiveRecord::Relation.
    def resolve
      if user.staff?
        scope.all
      else
        scope.where(participant_id: user.participant.id)
      end
    end
  end
end
