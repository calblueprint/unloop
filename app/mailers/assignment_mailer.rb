class AssignmentMailer < ApplicationMailer
    
    def new_assignment
        @assignment = params[:assignment]
        @url = ENV['MAIL_HOST']
        mail(to: "unlooptestparticipant@gmail.com", subject: '[Unloop] New Action Item Assigned')
    end
end
