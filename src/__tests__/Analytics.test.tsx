/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { render, wait } from "@testing-library/react";
import { mockDepartment, mockEvent, mockRsvp } from "./testMocks";

import Analytics from "../Analytics";

jest.mock("../makeGet", () => (path: string) => {
  if (path === "/departments") {
    return Promise.resolve({
      departments: [
        { ...mockDepartment({ id: 1, name: "Department", rsvps_count: 666 }) }
      ]
    });
  }

  if (path === "/events") {
    return Promise.resolve({
      events: [
        { ...mockEvent({ id: 1, name: "Event" }) }
      ],
      total_count: 404
    });
  }

  if (path === "/rsvps") {
    return Promise.resolve({
      events: [
        { ...mockRsvp({ id: 1 }) }
      ],
      total_count: 222
    });
  }

  throw new Error();
});

test("renders", async () => {
  const { queryByText } = render(
    <Analytics />
  );

  await wait();

  expect(queryByText("404")).toBeTruthy();
  expect(queryByText("222")).toBeTruthy();
  expect(queryByText("666")).toBeTruthy();
});
