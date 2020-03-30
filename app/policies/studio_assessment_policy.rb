class StudioAssessmentPolicy < ApplicationPolicy  
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
      staff? or (user.participant? and user.participant.id == resource.participant_id)
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
            scope.where([participant_id: user.participant.id])
        end
      end
    end
  
    private
  
    def staff?
      user.present? && user.staff?
    end
  end
  