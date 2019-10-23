class StaffSerializer < ActiveModel::Serializer
  attributes :id, :email, :name

  has_many :casenotes
  has_many :paperworks

  def email
    object.omniuser.email
  end

  def name
    object.omniuser.name
  end
end
