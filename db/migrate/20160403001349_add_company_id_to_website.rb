class AddCompanyIdToWebsite < ActiveRecord::Migration
  def change
    add_column :websites, :company_id, :integer
  end
end
