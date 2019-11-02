class CasenotePolicy < ApplicationPolicy
  def index?
    staff?
  end

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
    create? || (user.participant? && user.participant.id == resource.participant_id && resource.internal == false)
  end

  def internal
    staff?
  end

  def set_casenote?
    show?
  end

  class Scope < Scope
#         The first argument is a user. In your controller, Pundit will call the current_user method 
#               to retrieve what to send into this argument.
#         The second argument is a scope of some kind on which to perform some kind of query. 
#               It will usually be an ActiveRecord class or a ActiveRecord::Relation.
    def resolve
      if user.staff?
          scope.all
      else
          scope.where([participant_id: user.participant.id, internal: false])
      end
    end
  end

  private

  def staff?
    user.present? && user.staff?
  end
end
