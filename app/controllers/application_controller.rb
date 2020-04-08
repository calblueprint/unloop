class ApplicationController < ActionController::Base
  # before_action :authenticate_omniuser!
  include Pundit
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :set_raven_context
  after_action :verify_authorized, except: :index, unless: :devise_controller?
  after_action :verify_policy_scoped, only: :index

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def set_raven_context
    if current_user
      Raven.user_context(
        email: current_user.email,
        first_name: current_user.first_name,
        last_name: current_user.last_name,
        user_type: current_user.user_type,
        admin: current_user.admin,
        provider: current_user.provider,
        uid: current_user.uid
      )
    end
  end

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(request.referrer || root_path)
  end  

  def after_sign_out_path_for(resource_or_scope)
    root_path
  end
end
