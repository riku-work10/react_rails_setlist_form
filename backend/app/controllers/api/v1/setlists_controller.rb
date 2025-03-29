class Api::V1::SetlistsController < ApplicationController
  # セットリスト一覧取得（全ユーザー）
  def index
    setlists = Setlist.includes(:songs).order(created_at: :desc)
    render json: setlists.as_json(include: :songs), status: :ok
  end

  # セットリストを作成
  def create
    user = User.find_by(id: params[:user_id])  # user_idをフロントから受け取る
    return render json: { error: 'ユーザーが見つかりません' }, status: :not_found unless user

    setlist = user.setlists.build(setlist_params)

    if setlist.save
      render json: setlist, status: :created
    else
      render json: setlist.errors, status: :unprocessable_entity
    end
  end

  # セットリスト詳細取得
  def show
    setlist = Setlist.find(params[:id])
    render json: setlist.as_json(include: :songs), status: :ok
  end

  private

  def setlist_params
    params.require(:setlist).permit(:event_name, :event_date, :description)
  end
end
