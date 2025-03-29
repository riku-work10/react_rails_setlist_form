class Song < ApplicationRecord
  belongs_to :setlist

  validates :title, presence: true
  validates :order, presence: true
end
