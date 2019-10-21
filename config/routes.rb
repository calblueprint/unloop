Rails.application.routes.draw do
  
  resources :professional_questionnaire
  resources :personal_questionnaire

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # Routes for Google authentication
  devise_for :omniusers, controllers: { omniauth_callbacks: 'omniuser/omniauth_callbacks' }
  get 'auth/:provider/callback', to: 'sessions#googleAuth'

  # On failed authorization redirect to sign in page
  get 'auth/failure', to: redirect('/omniusers/sign_in')
end
