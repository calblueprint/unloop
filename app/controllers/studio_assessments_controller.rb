class StudioAssessmentsController < ApplicationController
  # GET /studio_assessments
  # GET /studio_assessments.json
  def index
    @studio_assessments = authorize StudioAssessment.all
    @studio_list = []
    @studio_assessments.each do |s|
      serialized_s = StudioAssessmentSerializer.new(s)
      @studio_list.push(serialized_s)
    end 
    
  end
end
