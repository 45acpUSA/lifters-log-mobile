class ApplicationController < ActionController::API
  acts_as_token_authentication_handler_for User

  before_action :configure_permitted_parameters, if: :devise_controller?
    
  def edit
    session[:return_to] ||= request.referer
    redirect_to session.delete(:return_to)
  end
  
  def update
      
  end
  
  protected
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys:[
        :first_name,
        :last_name,
        :affiliate,
        :location
      ]
    )
  end
end
