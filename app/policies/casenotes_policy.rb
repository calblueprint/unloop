class CasenotesPolicy < ApplicationPolicy
    def create?
      user.present? && user.user_type == "Staff"
    end
  
    def update?
      create?
    end
  
    def destroy?
        create?
    end

    def show?
        create? or (user.user_type == "Participant" && user.id == resource.participant_id && resource.internal == false)
    end


    class Scope < Scope
#         The first argument is a user. In your controller, Pundit will call the current_user method 
#               to retrieve what to send into this argument.
#         The second argument is a scope of some kind on which to perform some kind of query. 
#               It will usually be an ActiveRecord class or a ActiveRecord::Relation.
      def resolve
        if user.user_type == "Staff"
            scope.all
        else
            scope.where([participant_id: user.id, internal: false])
        end
      end
    end
  end