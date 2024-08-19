require "test_helper"

class ListTest < ActiveSupport::TestCase
  test "should not save list without name and position" do
    workspace = Workspace.new(name: "Workspace 1")
    workspace.save
    list = workspace.lists.new
    assert_not list.save, "Saved the list without a name"
  end

  test "should not save list without position" do
    workspace = Workspace.new(name: "Workspace 2")
    workspace.save
    list = workspace.lists.new(name: "List 1")
    assert_not list.save, "Saved the list without a position"
  end

  test "should not save list without name" do
    workspace = Workspace.new(name: "Workspace 3")
    workspace.save
    list = workspace.lists.new(position: 3)
    assert_not list.save, "Saved the list without name"
  end

  test "should save list with name and position" do
    workspace = Workspace.new(name: "Workspace 3")
    workspace.save
    list = workspace.lists.new(name: "List 1", position: 3)
    assert list.save, "Failed to save the list with a name and position"
  end
end
