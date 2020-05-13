class ParticipantPolicy < ApplicationPolicy
  def show?
    user.present? && user.staff?
  end

  def dashboard?
    user.participant?
  end

  def statuses?
    user.present? && user.staff?
  end
end
