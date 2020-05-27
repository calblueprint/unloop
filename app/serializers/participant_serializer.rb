class ParticipantSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :status

  has_many :case_notes
  has_many :paperworks

  has_many :studio_assessments

  has_one :personal_questionnaire
  has_one :professional_questionnaire

end
