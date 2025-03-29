class Api::V1::SetlistsController < ApplicationController
  # 現在のユーザーを仮定する（後で認証を追加する場合、ここを変更する）
  before_action :set_user

  def index
    setlists = @user.setlists.includes(:songs)
    render json: setlists.as_json(include: :songs)
  end

  def create
    setlist = @user.setlists.build(setlist_params)

    if setlist.save
      render json: setlist, status: :created
    else
      render json: setlist.errors, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.first || User.create(name: "Guest User")  # シンプルにゲストユーザーで仮想
  end

  def setlist_params
    params.require(:setlist).permit(:event_name, :event_date, :description)
  end
end
