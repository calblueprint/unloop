class SimpleParticipantSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :status

  def email
    object.omniuser.email
  end

  def name
    object.omniuser.name
  end
end
