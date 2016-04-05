class AddUserIdToWebsite < ActiveRecord::Migration
  def change
    add_column :websites, :user_id, :integer
  end
end
