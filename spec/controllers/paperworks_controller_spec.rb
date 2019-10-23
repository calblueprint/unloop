require 'rails_helper'

RSpec.describe PaperworksController, type: :controller do
  describe 'GET #index' do
    it 'assigns @paperworks' do
      # paperwork = Paperwork.create
      get :index
      # expect(assigns(:paperworks)).to eq([paperwork])
    end

    pending 'renders the index view' do
      get :index
      assert_equal 200, response.status
    end
  end
end
