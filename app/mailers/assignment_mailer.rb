class AssignmentMailer < ActionMailer::Base
    default from: 'unloopauth@gmail.com'

    def new_assignment
        @assignment = params[:assignment]
        if Rails.env.production?
            @url = ENV['PROD_MAIL_HOST']
        else
            @url = ENV['DEV_MAIL_HOST']
        end
        mail(to: @assignment.assigned_to.email, subject: '[Unloop] New Action Item Assigned')
    end
end
