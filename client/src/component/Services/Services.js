import React from "react";
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import PreviewPublication from "./PreviewService";
import "./Services.scss";

export default function Services(props) {
  const { getServices } = props;

  return (
    <div className="publications">
      <h1>Servicios</h1>
      <Grid columns={4}>
        {map(getServices, (service, index) => (
          <Grid.Column key={index}>
            <PreviewPublication service={service} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
}
