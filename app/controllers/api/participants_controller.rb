class Api::ParticipantsController < ApplicationController
    def statuses
        @statuses = Participant.statuses
        authorize @statuses, policy_class: ParticipantPolicy
        render json: @statuses
    end
end