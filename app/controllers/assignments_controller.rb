class AssignmentsController < ApplicationController
  def index
    skip_policy_scope
  end
end
