class Api::V1::SongsController < ApplicationController
  before_action :set_setlist

  # 楽曲を追加
  def create
    song = @setlist.songs.build(song_params)

    if song.save
      render json: song, status: :created
    else
      render json: song.errors, status: :unprocessable_entity
    end
  end

  private

  def set_setlist
    @setlist = Setlist.find(params[:setlist_id])
  end

  def song_params
    params.require(:song).permit(:title, :order)
  end
end
