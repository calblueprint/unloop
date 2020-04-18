class AssignmentMailer < ActionMailer::Base
    default from: 'unloopauth@gmail.com'

    def new_assignment
        @assignment = params[:assignment]
        mail(to: @assignment.assigned_to.email, subject: '[Unloop] New Action Item Assigned')
    end
end
