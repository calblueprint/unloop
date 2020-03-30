class ActionItemMailer < ApplicationMailer
    def assign_action_item
        @action_item = params[:action_item]
        @url = ENV['MAIL_HOST']
        mail(to: @action_item.assigned_to.email, subject: '[Unloop] New Action Item Assigned')
    end
end
