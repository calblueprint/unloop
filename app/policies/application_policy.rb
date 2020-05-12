class ApplicationPolicy
  attr_reader :user, :resource

  # In your controller, Pundit will call the current_user method
  #  to retrieve what to send into the argument
  def initialize(user, resource)
    raise Pundit::NotAuthorizedError, "must be logged in" unless user
    @user = user
    @resource = resource
  end

  def index?
    false
  end

  def show?
    false
  end

  def create?
    false
  end

  def new?
    create?
  end

  def update?
    false
  end

  def edit?
    update?
  end

  def destroy?
    false
  end
  
  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      raise Pundit::NotAuthorizedError, "must be logged in" unless user.present?
      @user = user
      @scope = scope
    end

    def resolve
      scope.all
    end
  end
end
