Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  # Routes for Google authentication
  devise_for :staffs, controllers: { omniauth_callbacks: 'staffs/omniauth_callbacks' }
  devise_for :participants, controllers: { omniauth_callbacks: 'participants/omniauth_callbacks' }

  # unsure if this needs to be here
  get 'auth/:provider/callback', to: 'sessions#googleAuth'
  get 'auth/failure', to: redirect('/')
end
