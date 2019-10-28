Rails.application.routes.draw do
  devise_for :admins, skip: :registrations, controllers: {
    session: 'admins/sessions'
  }
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # Routes for Google authentication
  devise_for :omniusers, controllers: { omniauth_callbacks: 'omniuser/omniauth_callbacks' }
  get 'auth/:provider/callback', to: 'sessions#googleAuth'

  # On failed authorization redirect to sign in page
  get 'auth/failure', to: redirect('/omniusers/sign_in')

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
