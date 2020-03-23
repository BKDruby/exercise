import React from "react";
import { Grid, Panel, Loader, Table } from "@culturehq/components";
import useGet from "./useGet";
import * as API from "./api";

const TotalEvents: React.FC = () => {
  const get = useGet<API.ListEvents>("/events");

  if (get.getting) {
    return <Loader loading />;
  }

  if (get.error) {
    throw get.error;
  }

  return (
    <Panel>
      <Panel.Heading>
        Total Events
      </Panel.Heading>
      <Panel.Body>
        {get.got.total_count}
      </Panel.Body>
    </Panel>
  );
};

const TotalRSVPs: React.FC = () => {
  const get = useGet<API.ListRsvps>("/rsvps");

  if (get.getting) {
    return <Loader loading />;
  }

  if (get.error) {
    throw get.error;
  }

  return (
    <Panel>
      <Panel.Heading>
        Total RSVPs
      </Panel.Heading>
      <Panel.Body>
        {get.got.total_count}
      </Panel.Body>
    </Panel>
  );
};

const RSVPsByDepartment: React.FC = () => {
  const get = useGet<API.ListDepartments>("/departments");

  if (get.getting) {
    return <Loader loading />;
  }

  if (get.error) {
    throw get.error;
  }

  return (
    <Panel>
      <Panel.Heading>
        RSVPs by Department
      </Panel.Heading>
      <Panel.Body>
        <Table>
          <thead>
            <tr>
              <th>Department name</th>
              <th>Rsvps count</th>
            </tr>
          </thead>
          <tbody>
            {get.got.departments.map(department => (
              <tr key={department.id}>
                <td>{department.name}</td>
                <td>{department.rsvps_count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Panel.Body>
    </Panel>
  );
};

const Analytics: React.FC = () => (
  <Grid>
    <Grid.Item sm={6}>
      <TotalEvents />
    </Grid.Item>
    <Grid.Item sm={6}>
      <TotalRSVPs />
    </Grid.Item>
    <Grid.Item>
      <RSVPsByDepartment />
    </Grid.Item>
  </Grid>
);

export default Analytics;
