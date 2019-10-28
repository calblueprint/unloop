class ApplicationController < ActionController::Base
    devise_group :omniuser, contains: [:participant, :staff]
    include Pundit
    protect_from_forgery
    def current_user
        return unless session[:omniuser_id]
        @current_user ||= Omniuser.find(session[:omniuser_id])
    end
end
