class ParticipantSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :status

  has_many :casenotes
  has_many :paperworks

  has_one :personal_questionnaire
  has_one :professional_questionnaire

  def email
    object.user.email
  end

  def first_name
    object.user.first_name
  end

  def last_name
    object.user.last_name
  end
end
