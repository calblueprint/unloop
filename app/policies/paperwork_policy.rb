class PaperworkPolicy < ApplicationPolicy
    def create?
      request = resource.request
      user.present? && user.account.user_type == "Staff" && request.artist_id == user.id
    end
  
    def update?
      create?
    end
  
    class Scope < Scope
#         The first argument is a user. In your controller, Pundit will call the current_user method 
#               to retrieve what to send into this argument.
#         The second argument is a scope of some kind on which to perform some kind of query. 
#               It will usually be an ActiveRecord class or a ActiveRecord::Relation.
      def resolve
        scope.joins(:requests).where(requests: {artist_id: user.id}).or(scope.joins(:requests).where(requests: {buyer_id: user.id}))
      end
    end
  end