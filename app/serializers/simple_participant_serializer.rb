class SimpleParticipantSerializer < ActiveModel::Serializer
  attributes :id, :email, :status, :name

  def name
    object.user.full_name
  end
end
