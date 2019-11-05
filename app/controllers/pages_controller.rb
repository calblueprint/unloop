class PagesController < ApplicationController
  def dashboard
    @user = current_user
    path =  case current_user.user_type
            when 'staff'
              dashboard_staffs_path
            when 'participant'
              dashboard_participants_path
            else
              new_user_session_path
            end
    render path
  end
end
