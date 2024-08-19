class CardsController < ApplicationController
  before_action :set_workspace
  before_action :set_list
  before_action :set_card, only: %i[ show edit update destroy ]

  # GET /cards or /cards.json
  def index
    @cards = Card.all
  end

  # GET /cards/1 or /cards/1.json
  def show
  end

  # GET /cards/new
  def new
    @card = @list.cards.new
  end

  # GET /cards/1/edit
  def edit
  end

  # POST /cards or /cards.json
  def create
    @currentList = List.find(params[:card][:list_id])
    @card = @currentList.cards.new(card_params)

    respond_to do |format|
      if @card.save
        format.html { redirect_to workspace_path(@workspace), notice: "Card was successfully created." }
        format.json { render :show, status: :created, location: @card }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /cards/1 or /cards/1.json
  def update
    respond_to do |format|
      if @card.update(card_params)
        format.html { redirect_to workspace_path(@workspace), notice: "Card was successfully updated." }
        format.json { render :show, status: :ok, location: @card }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cards/1 or /cards/1.json
  def destroy
    @card.destroy!

    respond_to do |format|
      format.html { redirect_to workspace_path(@workspace), notice: "Card was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    def set_workspace
      @workspace = Workspace.find(params[:workspace_id])
    end

    def set_list
      @list = @workspace.lists.find(params[:list_id])
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_card
      @card = @list.cards.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def card_params
      params.require(:card).permit(:text, :position, :list_id)
    end
end
