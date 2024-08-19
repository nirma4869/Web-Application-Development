class Card < ApplicationRecord
  validates :text, presence: true
  validates :position, presence: true
  belongs_to :list
end
