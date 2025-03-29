class CreateSongs < ActiveRecord::Migration[7.1]
  def change
    create_table :songs do |t|
      t.references :setlist, null: false, foreign_key: true
      t.string :title
      t.string :order

      t.timestamps
    end
  end
end
