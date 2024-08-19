require "test_helper"

class CardTest < ActiveSupport::TestCase
  test "should not save card without name and position" do
    workspace = Workspace.new(name: "Workspace 1")
    workspace.save
    list = workspace.lists.new(name: "List 1", position: 1)
    card = list.cards.new
    assert_not card.save, "Saved the card without a name"
  end

  test "should not save card without position" do
    workspace = Workspace.new(name: "Workspace 1")
    workspace.save
    list = workspace.lists.new(name: "List 1", position: 1)
    card = list.cards.new(text: "card 1")
    assert_not card.save, "Saved the card without a position"
  end

  test "should not save card without name" do
    workspace = Workspace.new(name: "Workspace 1")
    workspace.save
    list = workspace.lists.new(name: "List 1", position: 1)
    card = list.cards.new(position: 3)
    assert_not card.save, "Saved the card without name"
  end

  test "should save card with name and position" do
    workspace = Workspace.new(name: "Workspace 1")
    workspace.save
    list = workspace.lists.new(name: "List 1", position: 1)
    card = list.cards.new(text: "card 1", position: 3)
    assert card.save, "Failed to save the card with a name and position"
  end
end
