class PagesController < ApplicationController
  def dashboard
    path =  case current_user.user_type
            when 'staff'
              @user = current_user
              @participants = Participant.all
              @participant_names = []
              @participants.each do |p|
                @participant_names.push(p.full_name)
              end

              authorize Staff
              dashboard_staffs_path
            when 'participant'
              @user = current_user
              @paperworks = @user.participant.paperworks
              @case_notes = @user.participant.case_notes
              authorize Participant
              dashboard_participants_path
            else
              new_user_session_path
            end
    render path
  end
end
