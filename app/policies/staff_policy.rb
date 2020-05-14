class StaffPolicy < ApplicationPolicy
  def dashboard?
    user.present? && user.staff?
  end
end
