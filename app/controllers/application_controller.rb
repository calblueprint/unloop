class ApplicationController < ActionController::Base
  # before_action :authenticate_omniuser!
  include Pundit
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  after_action :verify_authorized, except: :index, unless: :devise_controller?
  after_action :verify_policy_scoped, only: :index

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(request.referrer || root_path)
  end  

  def after_sign_out_path_for(resource_or_scope)
    root_path
  end
end
