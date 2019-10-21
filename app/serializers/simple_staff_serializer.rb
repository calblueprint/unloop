class SimpleStaffSerializer < ActiveModel::Serializer
  attributes :id, :email, :name

  def email
    object.omniuser.email
  end

  def name
    object.omniuser.name
  end
end
