class CreateSetlists < ActiveRecord::Migration[7.1]
  def change
    create_table :setlists do |t|
      t.references :user, null: false, foreign_key: true
      t.string :event_name
      t.datetime :event_date
      t.text :description

      t.timestamps
    end
  end
end
