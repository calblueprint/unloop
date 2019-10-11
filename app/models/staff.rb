class Staff < Omniuser
    # uncomment if devise needs to be here
    # devise :database_authenticatable, :registerable,
    # :recoverable, :rememberable, :validatable 
    belongs_to :Omniuser
    has_many :casenotes
    has_many :paperworks
end
