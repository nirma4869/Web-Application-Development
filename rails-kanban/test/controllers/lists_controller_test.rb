require "test_helper"

class ListsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @workspace = workspaces(:one)
    @list = lists(:one)
  end

  test "should get index" do
    get workspace_url(@workspace)
    assert_response :success
  end

  test "should get new" do
    get new_workspace_list_path(@workspace)
    assert_response :success
  end

  test "should create list" do
    assert_difference("List.count") do
      post workspace_lists_path(@workspace), params: { list: { name: @list.name, position: @list.position } }
    end

    assert_redirected_to workspace_url(@workspace)
  end

  test "should show list" do
    get workspace_path(@workspace)
    assert_response :success
  end

  test "should get edit" do
    get edit_workspace_list_path(@workspace, @list)
    assert_response :success
  end

  test "should update list" do
    patch workspace_list_url(@workspace, @list), params: { list: { name: @list.name, position: @list.position } }
    assert_redirected_to workspace_path(@workspace)
  end

  test "should destroy list" do
    assert_difference("List.count", -1) do
      delete workspace_list_url(@workspace, @list)
    end

    assert_redirected_to workspace_path(@workspace)
  end
end
