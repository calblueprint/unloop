class PagesController < ApplicationController
  def dashboard
    @user = current_user

    path = case @user.user_type
            when 'staff'
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
                    "questionnaire_status" => completed(p),
                    "assignments_completed" => p.assignments.where(completed: true).length,
                    "assignments_count" => p.assignments.length,
                  }
                @participants_list.push(d)
              end
              authorize Staff
              dashboard_staffs_path
            when 'participant'
              @participant = @user.participant
              @paperworks =  policy_scope(Paperwork)
              @case_notes = policy_scope(CaseNote)
              @studio_assessments = policy_scope(StudioAssessment)
              
              if @participant.personal_questionnaire.nil?
                personal_q = PersonalQuestionnaire.create("participant_id": @participant.id)
              else
                personal_q = authorize @participant.personal_questionnaire, policy_class: QuestionnairePolicy
              end
              @personal_questionnaire = PersonalQuestionnaireSerializer.new(personal_q)
          
              
              if @participant.professional_questionnaire.nil?
                professional_q = ProfessionalQuestionnaire.create("participant_id": @participant.id)
              else
                professional_q = authorize @participant.professional_questionnaire, policy_class: QuestionnairePolicy
              end
              @professional_questionnaire = ProfessionalQuestionnairesSerializer.new(professional_q)

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
      if a == 'emergency_contact_2_name' || a == 'emergency_contact_2_phone_number' || a == 
        'emergency_contact_2_relationship'
        next
      end
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
