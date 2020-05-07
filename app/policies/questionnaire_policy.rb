class QuestionnairePolicy < ApplicationPolicy
  # this will work with personal questionnaires and professional questionnaires, but must be called with
  # authorize questionnaire otherwise will not be automatically called
  def create?
    user.present? && user.staff?
  end

  def show?
    create? or (user.participant? && user.participant.id == resource.participant_id)
  end

  def index? 
    staff?
  end

  def update?
    staff?
  end

  def destroy?
    staff?
  end

  private

  def staff?
    user.present? && user.staff?
  end
end
