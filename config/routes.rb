Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # Routes for Google authentication
  devise_for :omniusers, controllers: { omniauth_callbacks: 'omniuser/omniauth_callbacks' }
  get 'auth/:provider/callback', to: 'sessions#googleAuth'
  # On failed authorization redirect to sign in page
  get 'auth/failure', to: redirect('/omniusers/sign_in')
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  
  resources :paperworks, only: [:index, :show, :new, :edit]
  resources :casenotes, only: [:index, :new, :edit, :show]
  resources :professional_questionnaires, only: [:index, :show, :new, :edit]
  resources :personal_questionnaires, only: [:index, :new, :edit, :show]

  namespace :api, defaults: { format: :json } do
    resources :paperworks, only: [:show, :create, :update, :destroy] do
      patch 'complete', to: 'paperworks#complete'
    end
    resources :casenotes, only: [:show, :create, :update, :destroy] do
      patch 'internal', to: 'casenotes#internal'
    end
    resources :professional_questionnaires, only: [:show, :create, :update, :destroy]
    resources :personal_questionnaires, only: [:show, :create, :update, :destroy]
  end

  root 'paperworks#index'
end
