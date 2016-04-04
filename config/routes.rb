Rails.application.routes.draw do

  resources :companies, except: :new
  get '/companies/new/:id', to: "companies#new", as: :new_company
  resources :websites
  devise_for :users, controllers: {:omniauth_callbacks => 'omniauth_callbacks', :registrations => 'registrations' }
  root 'websites#index'

  #resources :users

end
