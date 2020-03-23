# frozen_string_literal: true

require 'test_helper'
require 'rack/test'

class AppTest < Minitest::Test
  include Rack::Test::Methods

  def app
    App
  end

  def test_list_events
    events_count = Event.count

    get '/events'

    assert last_response.ok?
    assert_equal events_count, last_body['events'].size
    assert_equal events_count, last_body['total_count']
  end

  def test_get_event
    event = Event.first

    get "/events/#{event.id}"

    assert last_response.ok?
    assert_equal event.name, last_body.dig('event', 'name')
  end

  def test_list_users
    get '/users'

    assert last_response.ok?
    assert_equal User.active.count, last_body['users'].size
  end

  def test_get_user
    user = User.first

    get "/users/#{user.id}"

    assert last_response.ok?
    assert_equal user.name, last_body.dig('user', 'name')
  end

  def test_list_departments
    get '/departments'

    assert last_response.ok?
    assert_equal Department.count, last_body['departments'].size
  end

  def test_list_rsvps
    rsvps_count = Rsvp.active.count

    get '/rsvps'

    assert last_response.ok?
    assert_equal rsvps_count, last_body['rsvps'].size
    assert_equal rsvps_count, last_body['total_count']
  end

  def test_not_found
    get '/users/foobar'

    assert last_response.not_found?
  end

  private

  def last_body
    JSON.parse(last_response.body)
  end
end
