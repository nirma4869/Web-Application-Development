class Workspace < ApplicationRecord
  validates :name, presence: true
  has_many :lists, dependent: :destroy
end
