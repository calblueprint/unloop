Rails.application.routes.draw do
  # Routes for Google authentication
  devise_for :users, controllers: { omniauth_callbacks: 'user/omniauth_callbacks' }
  get 'auth/:provider/callback', to: 'sessions#googleAuth'
  # On failed authorization redirect to sign in page
  get 'auth/failure', to: redirect('/users/sign_in')
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  resources :paperworks, only: [:index, :show, :new, :edit]
  resources :casenotes, only: [:index, :new, :edit, :show]

  namespace :api, defaults: { format: :json } do
    resources :paperworks, only: [:show, :create, :update, :destroy] do
      patch 'complete', to: 'paperworks#complete'
    end
    resources :casenotes, only: [:show, :create, :update, :destroy] do
      patch 'internal', to: 'casenotes#internal'
    end
  end

  root 'paperworks#index'
end
