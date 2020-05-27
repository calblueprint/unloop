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

        @templates = ActionItem.where(is_template: true).order('created_at DESC')
        @templates_list = []
        @templates.each do |template|
            serialized_action_item = ActionItemSerializer.new(template)
            @templates_list.push(serialized_action_item)
        end
    end

end
