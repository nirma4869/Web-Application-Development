class CreateCards < ActiveRecord::Migration[7.1]
  def change
    create_table :cards do |t|
      t.string :text
      t.integer :position

      t.timestamps
    end
  end
end
