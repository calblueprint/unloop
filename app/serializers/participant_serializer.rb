class ParticipantSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :status

  has_many :casenotes
  has_many :paperworks

  has_one :personal_questionnaire
  has_one :professional_questionnaire

  def email
    object.omniuser.email
  end

  def first_name
    object.omniuser.first_name
  end

  def last_name
    object.omniuser.last_name
  end
end
