class ActionItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :category, :fileURL, :is_template, :fileURL
end