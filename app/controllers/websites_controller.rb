class WebsitesController < ApplicationController
  before_action :authenticate_user!, except: [:show, :listing, :index, :submissions]
  before_action :set_website, only: [:show, :edit, :update, :destroy]

  def listing
  end

  def submissions
    @websites = current_user.websites.joins(:company)
  end

  def index
    @websites = Website.all
  end

  def show
  end

  def new
    @website = Website.new
    @user = current_user
  end

  def edit
  end

  def create
    @website = Website.new(website_params)

    respond_to do |format|
      if @website.save
        format.html { redirect_to new_company_path(@website.id), notice: 'Website was successfully created.' }
        format.json { render :show, status: :created, location: @website }
      else
        format.html { render :new }
        format.json { render json: @website.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @website.update(website_params)
        format.html { redirect_to @website, notice: 'Website was successfully updated.' }
        format.json { render :show, status: :ok, location: @website }
      else
        format.html { render :edit }
        format.json { render json: @website.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @website.destroy
    respond_to do |format|
      format.html { redirect_to websites_url, notice: 'Website was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_website
      @website = Website.find(params[:id])
    end

    def website_params
      params.require(:website).permit(:name, :twitter, :industry, :features, :description, :image, :user_id)
    end
end
