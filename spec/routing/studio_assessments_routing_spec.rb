require "rails_helper"

RSpec.describe StudioAssessmentsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/studio_assessments").to route_to("studio_assessments#index")
    end

    it "routes to #new" do
      expect(:get => "/studio_assessments/new").to route_to("studio_assessments#new")
    end

    it "routes to #show" do
      expect(:get => "/studio_assessments/1").to route_to("studio_assessments#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/studio_assessments/1/edit").to route_to("studio_assessments#edit", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/studio_assessments").to route_to("studio_assessments#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/studio_assessments/1").to route_to("studio_assessments#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/studio_assessments/1").to route_to("studio_assessments#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/studio_assessments/1").to route_to("studio_assessments#destroy", :id => "1")
    end
  end
end
