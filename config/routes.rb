Rails.application.routes.draw do
  resources :studio_assessments
  # Routes for Google authentication
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  get 'auth/:provider/callback', to: 'sessions#googleAuth'
  # On failed authorization redirect to sign in page
  get 'auth/failure', to: redirect('/users/sign_in')

  devise_scope :user do
    get 'users/sign_out', :to => 'devise/sessions#destroy'
  end

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  resources :assignments, :paperworks, :case_notes, :professional_questionnaires, :personal_questionnaires, only: [:index, :show, :new, :edit]

  get '/assignments', to: 'assignments#index'

  get '/studio_assessments', to: 'studio_assessments#index'
  
  resources :staffs, only: [] do
    collection do
      get 'dashboard', to: 'staffs#dashboard'
    end
  end

  resources :participants, only: [:show] do
    collection do
      get 'dashboard', to: 'participants#dashboard'
    end
  end

  namespace :api, defaults: { format: :json } do
    resources :paperworks, only: [:create, :update, :destroy] do
      patch 'complete', to: 'paperworks#complete', on: :member
      patch 'viewed', to: 'paperworks#viewed', on: :member
    end
    resources :case_notes, only: [:show, :create, :update, :destroy] do
      patch 'not_visible', to: 'case_notes#not_visible', on: :member
    end

    scope '/assignments' do
      post 'templates', to: 'assignments#create_template'
      patch 'templates/:id', to: 'assignments#update_template'
      get 'templates/:id', to: 'assignments#show_template'
      delete 'templates/:id', to: 'assignments#destroy_template'
    end

    resources :assignments, only: [:show, :create, :update, :destroy]
    resources :professional_questionnaires, only: [:show, :create, :update, :destroy]
    resources :personal_questionnaires, only: [:show, :create, :update, :destroy]
  end

  root 'pages#dashboard'
end
