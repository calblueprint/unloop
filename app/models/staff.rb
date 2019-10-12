class Staff < ApplicationRecord
    # uncomment if devise needs to be here
    # devise :database_authenticatable, :registerable,
    # :recoverable, :rememberable, :validatable
    belongs_to :omniuser
end
