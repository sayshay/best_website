Rails.application.routes.draw do

  resources :companies
  resources :websites
  devise_for :users, controllers: {:omniauth_callbacks => 'omniauth_callbacks', :registrations => 'registrations' }
  root 'websites#new'

  #resources :users

end
