class AssignmentsController < ApplicationController
    def index
        @assignments = authorize Assignment.all
        @user = current_user
        @participants = Participant.all
        @participants_list = []
        @participants.each do |p|
        
          if p.personal_questionnaire.nil?
              PersonalQuestionnaire.create("participant_id": p.id)
          end

          participant = SimpleParticipantSerializer.new(p)
          @participants_list.push(participant)
        end
    end

end
