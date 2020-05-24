class ActionItem < ApplicationRecord
    has_many :assignments, dependent: :destroy
    has_one_attached  :file
    validates :title, :description, :category, presence: true
    validates :is_template, inclusion: [true, false]

    enum category: {Finances: 0, Project: 1, Community: 2, Startup: 3, Treatment: 4, Health: 5, Education: 6}

    def fileURL
        return file && file.attached? ? Rails.application.routes.url_helpers.rails_blob_path(file, only_path: true) : nil
    end
end
