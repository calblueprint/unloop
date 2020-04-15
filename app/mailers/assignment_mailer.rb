class AssignmentMailer < ActionMailer::Base
    default from: 'unloopauth@gmail.com'

    def new_assignment
        @assignment = params[:assignment]
        if Rails.env.production?
            @url = "https://unloop-staging.herokuapp.com/"
        else
            @url = "localhost:3000"
        end
        mail(to: @assignment.assigned_to.email, subject: '[Unloop] New Action Item Assigned')
    end
end
