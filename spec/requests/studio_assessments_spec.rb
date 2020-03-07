require 'rails_helper'

RSpec.describe "StudioAssessments", type: :request do
  describe "GET /studio_assessments" do
    it "works! (now write some real specs)" do
      get studio_assessments_path
      expect(response).to have_http_status(200)
    end
  end
end
