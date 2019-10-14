import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const Employees = props => {
  const { employees, loading } = props;
  const classes = useStyles();

  return (
    <div>
      <h3>Employees</h3>
      {loading && <div>Loading...</div>}
      <ul>
        {employees.map(
          employee => !loading && <li key={employee.id}>{employee.name}</li>
        )}
      </ul>
    </div>
  );
};

export default Employees;
