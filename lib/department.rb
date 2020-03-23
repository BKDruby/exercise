# frozen_string_literal: true

class Department < ApplicationRecord
  has_many :users, dependent: :nullify
  has_many :rsvps, -> { where(users: { active: true }) }, through: :users

  def as_json(*args)
    super.merge(rsvps_count: rsvps.length)
  end
end
