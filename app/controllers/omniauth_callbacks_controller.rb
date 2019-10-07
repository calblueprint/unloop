class Omniuser::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def google_oauth2
        @omniuser = Omniuser.from_omniauth(request.env['omniauth.auth'])
  
        if @omniuser.persisted?
          flash[:notice] = I18n.t 'devise.omniauth_callbacks.success', kind: 'Google'
          sign_in_and_redirect @omniuser, event: :authentication
        else
          session['devise.google_data'] = request.env['omniauth.auth'].except(:extra) # Removing extra as it can overflow some session stores
          redirect_to new_user_registration_url, alert: @omniuser.errors.full_messages.join("\n")
        end
    end
  end