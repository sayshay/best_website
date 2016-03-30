json.array!(@websites) do |website|
  json.extract! website, :id, :name, :twitter, :industry, :features, :description
  json.url website_url(website, format: :json)
end
