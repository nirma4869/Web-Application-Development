require "test_helper"

class WorkspaceTest < ActiveSupport::TestCase
  test "should not save workspace without name" do
    workspace = Workspace.new
    assert_not workspace.save, "Saved the workspace without a name"
  end

  test "should save workspace with name" do
    workspace = Workspace.new(name: "Workspace 1")
    assert workspace.save, "Saved the workspace with a name did not work"
  end
end
