class Paperwork < ApplicationRecord
  belongs_to :staff
  has_many :participant
end
