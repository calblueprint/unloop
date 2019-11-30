class PagesController < ApplicationController
  def dashboard
    path =  case current_user.user_type
            when 'staff'
              @user = current_user
              @participants = Participant.all
              authorize Staff
              dashboard_staffs_path
            when 'participant'
              @user = current_user
              @participant = @user.participant
              @paperworks = @user.participant.paperworks
              @case_notes = @user.participant.case_notes

              if @participant.personal_questionnaire.nil?
                @personal_questionnaire = PersonalQuestionnaire.create("participant_id": @participant.id)
              else
                @personal_questionnaire = @participant.personal_questionnaire
              end
          
              if @participant.professional_questionnaire.nil?
                @professional_questionnaire = ProfessionalQuestionnaire.create("participant_id": @participant.id)
              else
                @professional_questionnaire = @participant.professional_questionnaire
              end

              authorize Participant
              dashboard_participants_path
              
            else
              new_user_session_path
            end
    render path
  end
end
