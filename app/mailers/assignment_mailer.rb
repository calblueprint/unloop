class AssignmentMailer < ApplicationMailer
    
    def new_assignment
        @assignment = params[:assignment]
        @url = ENV['MAIL_HOST']
        mail(to: ENV['SENDMAIL_USERNAME'], subject: '[Unloop] New Action Item Assigned')
    end
end
