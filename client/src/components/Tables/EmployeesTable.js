import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import countries from "assets/data/countries";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 500
  },
  paper: {
    height: 420
  }
});

function getCountryName(code) {
  let obj = countries.find(o => o.alpha2Code == code);
  return obj.name;
}

export default function EmployeesTable(props) {
  const { tableData } = props;
  //const tableData = [{ US: 10 }, { CN: 20 }];

  const classes = useStyles();

  return (
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Country</TableCell>
          <TableCell align="right">Total Employees</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map(obj => (
          <TableRow key={Object.keys(obj)}>
            <TableCell>
              <div className="flag">
                <img
                  alt="..."
                  src={`https://www.countryflags.io/${Object.keys(
                    obj
                  )}/flat/24.png`}
                />
              </div>
            </TableCell>
            <TableCell align="left">
              {getCountryName(Object.keys(obj))}
            </TableCell>

            <TableCell align="right">{Object.values(obj)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
