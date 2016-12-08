Rails.application.routes.draw do
  get 'lists/index'

  get 'lists/show'

  #Root Routes
  root 'boards#index'

  #Devise Routes
  devise_for :users

  #Resource Routes
  resources :boards do
    resources :lists 
  end

  #custom GET routes
  #custom POST routes
  #custom PUT routes
  #custom DELETE routes
end
