# frozen_string_literal: true

require 'setup'
require 'sinatra/base'

class App < Sinatra::Base
  set :server, 'puma'
  set :bind, '0.0.0.0'
  disable :show_exceptions

  before do
    content_type('application/json')
    headers(
      'Access-Control-Allow-Origin' => '*',
      'Access-Control-Allow-Methods' => '*'
    )
  end

  get '/users' do
    { users: User.active.order(:name) }.to_json
  end

  get '/users/:user_id' do
    user = User.active.includes(rsvps: :event).find(params[:user_id])
    { user: user }.to_json(include: { rsvps: { include: :event } })
  end

  get '/events' do
    events =  Event.includes(:host).order(:starts_at)
    { events: events, total_count: events.count }.to_json(include: :host)
  end

  get '/events/:event_id' do
    event = Event.includes(rsvps: :user).find(params[:event_id])
    { event: event }.to_json(include: { rsvps: { include: :user } })
  end

  get '/departments' do
    { departments: Department.all.includes(:rsvps) }.to_json
  end

  get '/rsvps' do
    rsvps = Rsvp.active
    { rsvps: rsvps, total_count: rsvps.count }.to_json
  end

  error Sinatra::NotFound, ActiveRecord::RecordNotFound do
    halt 404
  end
end
