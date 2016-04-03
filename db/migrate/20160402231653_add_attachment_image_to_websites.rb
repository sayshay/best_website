class AddAttachmentImageToWebsites < ActiveRecord::Migration
  def self.up
    change_table :websites do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :websites, :image
  end
end
