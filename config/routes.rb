Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  # Routes for Google authentication
  devise_for :omniusers, controllers: { omniauth_callbacks: 'omniuser/omniauth_callbacks' }
  
  # leaving out for now but if we need devise for the specific user types
  devise_for :staffs
  devise_for :participants

  # unsure if this needs to be here
  get 'auth/:provider/callback', to: 'sessions#googleAuth'
  
  # ideally should have a log in failure page
  get 'auth/failure', to: redirect('/staffs/sign_in')
end
