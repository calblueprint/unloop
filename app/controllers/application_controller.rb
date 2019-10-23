class ApplicationController < ActionController::Base
    devise_group :omniuser, contains: [:participant, :staff]
end
