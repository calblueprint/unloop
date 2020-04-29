class PagesController < ApplicationController
  def dashboard
    path =  case current_user.user_type
            when 'staff'
              @user = current_user
              @participants = Participant.all
              @participants_list = []
              @participants.each do |p|
                if p.personal_questionnaire.nil?
                    PersonalQuestionnaire.create("participant_id": p.id)
                end
              d = {"name" => p.full_name, 
                    "status" => p.status, 
                    "id" => p.id, 
                    "case_notes_count" => p.case_notes.length, 
                    "paperworks_count" => p.paperworks.length,
                    "paperworks_completed" => p.paperworks.where(agree: true).length,
                    "questionnaire_status" => completed(p)}
                @participants_list.push(d)
              end
              authorize Staff
              dashboard_staffs_path
            when 'participant'
              @user = current_user
              @participant = @user.participant
              @paperworks = @user.participant.paperworks
              @case_notes = @user.participant.case_notes.where(visible: true)
              
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

              @studio_assessments = @participant.studio_assessments

              authorize Participant
              dashboard_participants_path
              
            else
              new_user_session_path
            end
    render path
  end

  private

  def completed(p)
    if p.personal_questionnaire.nil?
      return false
    end

    if p.professional_questionnaire.nil?
      return false
    end

    p.personal_questionnaire.attributes.each do |a, v|
      if !v
        return false 
      end
    end

    p.professional_questionnaire.attributes.each do |a, v|
      if !v
        return false 
      end
    end
    
    return true
  end
end
