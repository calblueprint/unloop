require 'rails_helper'

RSpec.describe "studio_assessments/show", type: :view do
  before(:each) do
    @studio_assessment = assign(:studio_assessment, StudioAssessment.create!(
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
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(//)
    expect(rendered).to match(/2/)
    expect(rendered).to match(/Bigpicture Comment/)
    expect(rendered).to match(/3/)
    expect(rendered).to match(/Progfundamentals Comment/)
    expect(rendered).to match(/4/)
    expect(rendered).to match(/Versioncontrol Comment/)
    expect(rendered).to match(/5/)
    expect(rendered).to match(/React Comment/)
    expect(rendered).to match(/6/)
    expect(rendered).to match(/Node Comment/)
    expect(rendered).to match(/7/)
    expect(rendered).to match(//)
    expect(rendered).to match(/8/)
    expect(rendered).to match(/Problemsolving Comment/)
    expect(rendered).to match(/9/)
    expect(rendered).to match(/Problemsolvingalt Comment/)
    expect(rendered).to match(/false/)
    expect(rendered).to match(/Capstone Comment/)
    expect(rendered).to match(/Proctor/)
    expect(rendered).to match(/Assessment Type/)
  end
end
