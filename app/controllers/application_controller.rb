class ApplicationController < ActionController::Base
    devise_group :omniuser, contains: [:participant, :staff]
    include Pundit
    protect_from_forgery
end
