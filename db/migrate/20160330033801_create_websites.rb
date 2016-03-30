class CreateWebsites < ActiveRecord::Migration
  def change
    create_table :websites do |t|
      t.string :name
      t.string :twitter
      t.string :industry
      t.text :features
      t.text :description

      t.timestamps null: false
    end
  end
end
