class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name
      t.string :email
      t.string :twitter
      t.string :city
      t.string :city
      t.string :state

      t.timestamps null: false
    end
  end
end
