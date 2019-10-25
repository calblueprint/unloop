class Omniuser::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def google_oauth2
        @omniuser = Omniuser.from_omniauth(request.env['omniauth.auth'])

        if @omniuser and @omniuser.persisted?
          session[:omniuser_id] = @omniuser.id
          flash[:notice] = I18n.t 'devise.omniauth_callbacks.success', kind: 'Google'
          sign_in_and_redirect @omniuser, event: :authentication
        else
          # Removing extra as it can overflow some session stores
          session['devise.google_data'] = request.env['omniauth.auth'].except(:extra).except(:id_token)
          redirect_to new_omniuser_session_path
        end
    end
  end
