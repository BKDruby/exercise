/* eslint-disable @typescript-eslint/camelcase */

import * as API from "../api";

const makeMock = <T extends object>(defaults: T) => (opts: Partial<T> = {}): T => ({
  ...defaults, ...opts
});

export const mockUser = makeMock<API.User>({
  id: 1,
  active: true,
  name: "Mock user",
  created_at: "2019-01-01",
  updated_at: "2019-01-01"
});

export const mockEvent = makeMock<API.Event>({
  id: 1,
  name: "Mock event",
  starts_at: "2019-01-01",
  ends_at: "2019-01-01",
  created_at: "2019-01-01",
  updated_at: "2019-01-01"
});

export const mockRsvp = makeMock<API.Rsvp>({
  id: 1,
  response_type: "accepted",
  created_at: "2019-01-01",
  updated_at: "2019-01-01"
});

export const mockDepartment = makeMock<API.Department>({
  id: 1,
  name: "admin",
  created_at: "2019-01-01",
  updated_at: "2019-01-01",
  rsvps_count: 444
});
