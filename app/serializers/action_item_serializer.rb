class ActionItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :category, :fileURL, :is_template

  def fileURL
    return object.file && object.file.attached? ? Rails.application.routes.url_helpers.rails_blob_path(object.file, only_path: true) : nil
  end
end