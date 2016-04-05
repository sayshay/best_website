class Company < ActiveRecord::Base

  has_many :websites

  has_attached_file :image,
    :styles =>{
      },
    :storage => :s3,
    :bucket => 'best-websites',
    :path => "websites",
    :url =>':s3_domain_url',
    :s3_credentials => {
      :access_key_id => "AKIAJ767HFBVDLVLH3MQ",
      :secret_access_key => "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"
    }
  # validates_attachment_presence :image
  validates_attachment_size :image, :less_than => 5.megabytes
  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

  def address
    city + ", " + state
  end
end
