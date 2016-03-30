json.array!(@companies) do |company|
  json.extract! company, :id, :name, :email, :twitter, :city, :city, :state
  json.url company_url(company, format: :json)
end
