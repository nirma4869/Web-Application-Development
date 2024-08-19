class AddWorkspaceIdToLists < ActiveRecord::Migration[7.1]
  def change
    add_column :lists, :workspace_id, :integer
  end
end
