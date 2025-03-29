Rails.application.routes.draw do
  mount ActionCable.server => '/ws'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  Rails.application.routes.draw do
    get "tasks" => "tasks#index"
    post "tasks" => "tasks#create"
    delete "tasks/:id" => "tasks#destroy"
    put "tasks/:id" => "tasks#update"
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
