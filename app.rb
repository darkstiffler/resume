require 'sinatra'
require 'mongoid'
require 'oj'
require "sinatra/reloader" if development?

Mongoid.load!("mongoid.yml")

class Doc
  include Mongoid::Document

  field :name_first, type: String
  field :name_middle, type: String
  field :name_last, type: String
  field :linked_in, type: String
  field :phone, type: String
  field :website, type: String
  field :email, type: String
  field :twitter, type: String

  embeds_many :street_address
end 



class StreetAddress
  include Mongoid::Document

  field :street, type: String
  field :city, type: String
  field :state, type: String
  field :zip_code, type: String

  embedded_in :Doc
end





get '/' do
  content_type :json
  docs = Doc.all
  docs.to_json
end

post '/' do
  data = JSON.parse(request.body.read)[:resume]
  doc = Doc.create! (data)
  doc.to_json
end

put '/:id' do
  data = JSON.parse(request.body.read)[:resume]
  doc = doc.find params[:id]
  doc.to_json
end

delete '/:id' do
  data = JSON.parse(request.body.read)[:resume]
  doc.destroy
end


