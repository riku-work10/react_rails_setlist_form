Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :create, :destroy]
      resources :setlists, only: [:index, :show, :create, :destroy] do
        resources :songs, only: [:create]
      end
    end
  end
end
