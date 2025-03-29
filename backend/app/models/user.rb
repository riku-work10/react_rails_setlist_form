class User < ApplicationRecord
  has_many :setlists, dependent: :destroy
end
