class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery with: :exception
  before_action :authenticate_omniuser!

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def pundit_user
    current_omniuser
  end
end
