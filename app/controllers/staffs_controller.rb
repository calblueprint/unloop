class StaffsController < ApplicationController
  def dashboard
    skip_authorization
    redirect_to root_path
  end
end
