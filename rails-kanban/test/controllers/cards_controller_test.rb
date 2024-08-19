# test/controllers/cards_controller_test.rb
require 'test_helper'

class CardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @workspace = workspaces(:one)
    @list = lists(:one)
    @card = cards(:one)
  end

  test "should get index" do
    get workspace_url(@workspace)
    assert_response :success
  end

  test "should get new" do
    get new_workspace_list_card_url(@workspace, @list)
    assert_response :success
  end

  test "should create card" do
    assert_difference("Card.count") do
      post workspace_list_cards_url(@workspace, @list), params: { card: { text: @card.text, position: @card.position, list_id: @list.id  } }
    end

    assert_redirected_to workspace_url(@workspace)
  end

  test "should show card" do
    get workspace_path(@workspace)
    assert_response :success
  end

  test "should get edit" do
    get edit_workspace_list_card_url(@workspace, @list, @card)
    assert_response :success
  end

  test "should update card" do
    patch workspace_list_card_url(@workspace, @list, @card), params: { card: { text: 'Updated Title', position: 2 } }
    assert_redirected_to workspace_url(@workspace)
  end

  test "should destroy card" do
    assert_difference("Card.count", -1) do
      delete workspace_list_card_url(@workspace, @list, @card)
    end

    assert_redirected_to workspace_url(@workspace)
  end
end
