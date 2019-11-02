class StaffSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name

  has_many :casenotes
  has_many :paperworks

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
