class RegistrationsController < Devise::RegistrationsController

  protected

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

  def after_update_path_for(resource)
    root_path
  end

  private

  def sign_up_params
      params.require(:user).permit(:name, :phone, :zip_code, :username, :email,
                                   :password, :password_confirmation, :image, :image_url)
  end

  def account_update_params
      params.require(:user).permit(:name, :phone, :zip_code, :username,
                                   :email, :image, :password,
                                   :password_confirmation, :image_url)

  end

end
