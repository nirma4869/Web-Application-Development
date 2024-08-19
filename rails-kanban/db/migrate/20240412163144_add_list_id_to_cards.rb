class AddListIdToCards < ActiveRecord::Migration[7.1]
  def change
    add_column :cards, :list_id, :integer
  end
end
