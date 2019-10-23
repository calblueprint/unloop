class ParticipantSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :status

  has_many :casenotes
  has_many :paperworks

  has_one :personal_questionnaire
  has_one :professional_questionnaire

  def email
    object.omniuser.email
  end

  def name
    object.omniuser.name
  end
end
