class QuestionnairePolicy < ApplicationPolicy
    # this will work with personal questionnaires and professional questionnaires, but must be called with
    # authorize questionnaire otherwise will not be automatically called
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
        create? or (user.user_type == "Participant" && user.participant.id == resource.participant_id)
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
                scope.where(participant_id: user.participant.id)
            end
        end
    end
  end
  