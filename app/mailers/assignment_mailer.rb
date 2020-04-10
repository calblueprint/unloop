class AssignmentMailer < ApplicationMailer
    
    def new_assignment
        print("we have reached the mailer")
        @assignment = params[:assignment]
        @url = "localhost:3000"
        mail(to: "unlooptestparticipant@gmail.com", subject: '[Unloop] New Action Item Assigned')
    end
end
