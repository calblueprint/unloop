class Paperwork < ApplicationRecord
  belongs_to :staff
  has_one :participant
end
