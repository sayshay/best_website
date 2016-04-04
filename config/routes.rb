Rails.application.routes.draw do

  root 'websites#index'

  resources :companies, except: :new
  resources :websites

  devise_for :users, controllers: {:omniauth_callbacks => 'omniauth_callbacks', :registrations => 'registrations' }

  get '/companies/new/:id', to: "companies#new", as: :new_company

  get '/listing', to: "websites#listing", as: :listing

  #resources :users

end
