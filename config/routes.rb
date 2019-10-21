Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :casenotes, :only => [:index, :new, :edit, :show, :create, :update, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :casenotes, :only => [:create, :update, :destroy]
    patch 'casenotes/:id/internal' => 'casenotes#internal'
  end
end
