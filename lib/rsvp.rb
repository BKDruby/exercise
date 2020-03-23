# frozen_string_literal: true

class Rsvp < ApplicationRecord
  belongs_to :event
  belongs_to :user

  scope :active, -> { includes(:user).where(users: { active: true }) }

  enum response_type: { invited: -1, declined: 1, interested: 2, accepted: 3 }
end
