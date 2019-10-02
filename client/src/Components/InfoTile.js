/* eslint-disable no-script-url */

import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function InfoTile(props) {
  const classes = useStyles();
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let empSalaries = props.employees.map(employee => +employee.sal);
  let total = empSalaries.reduce(reducer, 0);
  let date = Date(Date.now());

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  return (
    <React.Fragment>
      <Title>Total Monthly Salaries</Title>
      <Typography component="p" variant="h4">
        {formatter.format(total)}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {date.toString()}
      </Typography>
      <div>
        <Link color="primary" href="javascript:;">
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}