class PersonalQuestionnaire < ApplicationRecord
    belongs_to :participant
    has_one_attached :resume
end
