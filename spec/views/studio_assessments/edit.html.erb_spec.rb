require 'rails_helper'

RSpec.describe "studio_assessments/edit", type: :view do
  before(:each) do
    @studio_assessment = assign(:studio_assessment, StudioAssessment.create!(
      :name => "MyString",
      :participant_id => "",
      :bigpicture_score => 1,
      :bigpicture_comment => "MyString",
      :progfundamentals_score => 1,
      :progfundamentals_comment => "MyString",
      :versioncontrol_score => 1,
      :versioncontrol_comment => "MyString",
      :react_score => 1,
      :react_comment => "MyString",
      :node_score => 1,
      :node_comment => "MyString",
      :db_score => 1,
      :db_comment => "",
      :problemsolving_score => 1,
      :problemsolving_comment => "MyString",
      :problemsolvingalt_score => 1,
      :problemsolvingalt_comment => "MyString",
      :passed_capstone => false,
      :capstone_comment => "MyString",
      :proctor => "MyString",
      :assessment_type => "MyString"
    ))
  end

  it "renders the edit studio_assessment form" do
    render

    assert_select "form[action=?][method=?]", studio_assessment_path(@studio_assessment), "post" do

      assert_select "input[name=?]", "studio_assessment[name]"

      assert_select "input[name=?]", "studio_assessment[participant_id]"

      assert_select "input[name=?]", "studio_assessment[bigpicture_score]"

      assert_select "input[name=?]", "studio_assessment[bigpicture_comment]"

      assert_select "input[name=?]", "studio_assessment[progfundamentals_score]"

      assert_select "input[name=?]", "studio_assessment[progfundamentals_comment]"

      assert_select "input[name=?]", "studio_assessment[versioncontrol_score]"

      assert_select "input[name=?]", "studio_assessment[versioncontrol_comment]"

      assert_select "input[name=?]", "studio_assessment[react_score]"

      assert_select "input[name=?]", "studio_assessment[react_comment]"

      assert_select "input[name=?]", "studio_assessment[node_score]"

      assert_select "input[name=?]", "studio_assessment[node_comment]"

      assert_select "input[name=?]", "studio_assessment[db_score]"

      assert_select "input[name=?]", "studio_assessment[db_comment]"

      assert_select "input[name=?]", "studio_assessment[problemsolving_score]"

      assert_select "input[name=?]", "studio_assessment[problemsolving_comment]"

      assert_select "input[name=?]", "studio_assessment[problemsolvingalt_score]"

      assert_select "input[name=?]", "studio_assessment[problemsolvingalt_comment]"

      assert_select "input[name=?]", "studio_assessment[passed_capstone]"

      assert_select "input[name=?]", "studio_assessment[capstone_comment]"

      assert_select "input[name=?]", "studio_assessment[proctor]"

      assert_select "input[name=?]", "studio_assessment[assessment_type]"
    end
  end
end
