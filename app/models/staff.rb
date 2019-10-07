class Staff < ApplicationRecord
    has_many :casenotes
    has_many :paperworks
end
