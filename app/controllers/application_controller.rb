class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!     # changes depending on what ever you name devise model 
end
