class AssignmentMailer < ActionMailer::Base
    default from: 'unloopauth@gmail.com'

    def new_assignment
        @assignment = params[:assignment]
        @action_item = params[:action_item]
        if @assignment.due_date.nil?
            @due_date = "None"
        else
            @due_date = @assignment.due_date
        end
        mail(to: @assignment.assigned_to.email, subject: '[Unloop] New Action Item Assigned')
    end
end
