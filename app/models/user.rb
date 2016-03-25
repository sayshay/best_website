class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable,
         omniauth_providers: [:twitter, :facebook, :google_oauth2]

   def self.from_omniauth(auth)
    p '************************'
    p auth.info
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.email = auth.info.email
      user.image_url = auth.info.image
      user.password = Devise.friendly_token[0, 20]
    end
   end

   def self.new_with_session(params, session)
     if session['devise.user_attributes']
       new(session['user_attributes'], without_protection: true) do |user|
         user.attributes = params
         user.valid?
       end
     else
       super
     end
   end

   def email_required?
     false
   end

   def email_changed?
     false
   end

end
