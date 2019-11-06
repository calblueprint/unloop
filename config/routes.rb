Rails.application.routes.draw do
  # Routes for Google authentication
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  get 'auth/:provider/callback', to: 'sessions#googleAuth'
  # On failed authorization redirect to sign in page
  get 'auth/failure', to: redirect('/users/sign_in')
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  resources :paperworks, only: [:index, :show, :new, :edit]
  resources :case_notes, only: [:index, :new, :edit, :show]

  namespace :api, defaults: { format: :json } do
    resources :paperworks, only: [:show, :create, :update, :destroy] do
      patch 'complete', to: 'paperworks#complete'
    end
    resources :case_notes, only: [:show, :create, :update, :destroy] do
      patch 'internal', to: 'case_notes#internal'
    end
  end

  root 'paperworks#index'
end
