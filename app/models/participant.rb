class Participant < ApplicationRecord
  has_many: casenotes

  enum status: {r0: 0, r1: 1, r2: 2, studio: 3}

end
