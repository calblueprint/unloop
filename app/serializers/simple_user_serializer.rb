class SimpleUserSerializer < ActiveModel::Serializer
    attributes :id, :email, :first_name, :last_name
  
    def email
      object.email
    end
  
    def first_name
      object.first_name
    end
  
    def last_name
      object.last_name
    end
  end