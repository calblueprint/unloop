Rails.application.routes.draw do
  # Routes for Google authentication
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  get 'auth/:provider/callback', to: 'sessions#googleAuth'
  # On failed authorization redirect to sign in page
  get 'auth/failure', to: redirect('/users/sign_in')
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  resources :paperworks, :case_notes, only: [:index, :show, :new, :edit]

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
    end
    resources :case_notes, only: [:show, :create, :update, :destroy] do
      patch 'internal', to: 'case_notes#internal', on: :member
    end
  end

  root 'pages#dashboard'
end
