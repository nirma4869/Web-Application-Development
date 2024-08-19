class List < ApplicationRecord
  validates :name, presence: true
  validates :position, presence: true
  belongs_to :workspace
  has_many :cards, dependent: :destroy
end
