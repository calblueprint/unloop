require 'rails_helper'

RSpec.describe "studio_assessments/index", type: :view do
  before(:each) do
    assign(:studio_assessments, [
      StudioAssessment.create!(
        :name => "Name",
        :participant_id => "",
        :bigpicture_score => 2,
        :bigpicture_comment => "Bigpicture Comment",
        :progfundamentals_score => 3,
        :progfundamentals_comment => "Progfundamentals Comment",
        :versioncontrol_score => 4,
        :versioncontrol_comment => "Versioncontrol Comment",
        :react_score => 5,
        :react_comment => "React Comment",
        :node_score => 6,
        :node_comment => "Node Comment",
        :db_score => 7,
        :db_comment => "",
        :problemsolving_score => 8,
        :problemsolving_comment => "Problemsolving Comment",
        :problemsolvingalt_score => 9,
        :problemsolvingalt_comment => "Problemsolvingalt Comment",
        :passed_capstone => false,
        :capstone_comment => "Capstone Comment",
        :proctor => "Proctor",
        :assessment_type => "Assessment Type"
      ),
      StudioAssessment.create!(
        :name => "Name",
        :participant_id => "",
        :bigpicture_score => 2,
        :bigpicture_comment => "Bigpicture Comment",
        :progfundamentals_score => 3,
        :progfundamentals_comment => "Progfundamentals Comment",
        :versioncontrol_score => 4,
        :versioncontrol_comment => "Versioncontrol Comment",
        :react_score => 5,
        :react_comment => "React Comment",
        :node_score => 6,
        :node_comment => "Node Comment",
        :db_score => 7,
        :db_comment => "",
        :problemsolving_score => 8,
        :problemsolving_comment => "Problemsolving Comment",
        :problemsolvingalt_score => 9,
        :problemsolvingalt_comment => "Problemsolvingalt Comment",
        :passed_capstone => false,
        :capstone_comment => "Capstone Comment",
        :proctor => "Proctor",
        :assessment_type => "Assessment Type"
      )
    ])
  end

  it "renders a list of studio_assessments" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => "Bigpicture Comment".to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => "Progfundamentals Comment".to_s, :count => 2
    assert_select "tr>td", :text => 4.to_s, :count => 2
    assert_select "tr>td", :text => "Versioncontrol Comment".to_s, :count => 2
    assert_select "tr>td", :text => 5.to_s, :count => 2
    assert_select "tr>td", :text => "React Comment".to_s, :count => 2
    assert_select "tr>td", :text => 6.to_s, :count => 2
    assert_select "tr>td", :text => "Node Comment".to_s, :count => 2
    assert_select "tr>td", :text => 7.to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => 8.to_s, :count => 2
    assert_select "tr>td", :text => "Problemsolving Comment".to_s, :count => 2
    assert_select "tr>td", :text => 9.to_s, :count => 2
    assert_select "tr>td", :text => "Problemsolvingalt Comment".to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
    assert_select "tr>td", :text => "Capstone Comment".to_s, :count => 2
    assert_select "tr>td", :text => "Proctor".to_s, :count => 2
    assert_select "tr>td", :text => "Assessment Type".to_s, :count => 2
  end
end
