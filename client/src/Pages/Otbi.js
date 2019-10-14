import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import VectorMapView from "../Components/VectorMapView";
import TotalEmpInfoTile from "../Components/TotalEmpInfoTile";
import Divider from "@material-ui/core/Divider";
import EmployeesTable from "../Components/EmployeesTable";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  button: {
    margin: theme.spacing(1),
    width: "200px"
  },
  buttonHot: {
    margin: theme.spacing(1),
    width: "200px",
    backgroundColor: "#254e3e"
  },
  form: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250
  },

  title: {
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar,

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  buttonContainer: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "row"
  },
  fixedHeight: {
    height: 290
  }
}));

export default function Otbi(props) {
  const [sessionId, setSessionId] = useState();
  const [otbiData, setOtbiData] = useState([]);
  const [mapData, setMapData] = useState();
  const [tableData, setTableData] = useState([]);
  const { loginDetails, setLoginDetails } = props;
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleChange = name => event => {
    setLoginDetails({
      ...loginDetails,
      [name]: event.target.value
    });
  };

  function handleLogon() {
    fetch("/api/otbi", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ loginDetails: loginDetails })
    })
      .then(resp => resp.json())
      .then(data =>
        setLoginDetails({
          ...loginDetails,
          sessionId: data.sessionId
        })
      );
  }

  function handleLogoff() {
    fetch("/api/otbi-logoff", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ loginDetails: loginDetails })
    })
      .then(resp => resp.json())
      .then(data =>
        setLoginDetails({
          ...loginDetails,
          sessionId: data
        })
      )
      .then(setOtbiData([]))
      .then(setMapData({}))
      .then(setTableData([]));
  }

  function getOtbi() {
    fetch("/api/otbi-report", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ loginDetails: loginDetails })
    })
      .then(resp => resp.json())
      .then(function(data) {
        setOtbiData(data);
        groupByCountry(data);
      });
  }

  function groupByCountry(data) {
    let obj = {};
    for (let i = 0; i < data.length; i++) {
      let country = data[i].Column5;
      if (obj[country]) {
        obj[country] = obj[country] + 1;
      } else {
        obj[country] = 1;
      }
    }
    setMapData(obj);
    populateTable(obj);
  }

  function populateTable(data) {
    let result = Object.keys(data)
      .map(function(key) {
        return { [key]: data[key] };
      })
      .sort(function(a, b) {
        return Object.values(b) - Object.values(a);
      })
      .filter(obj => Object.keys(obj) != typeof undefined)
      .slice(0, 5);

    setTableData(result);
  }

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <EmployeesTable tableData={tableData} />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <VectorMapView mapData={mapData} />
          </Grid>

          {/* OTBI Session Id */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={classes.paper}>
              <form className={classes.form}>
                <Grid item xs={12} md={12} lg={12}>
                  <TextField
                    id="session-id"
                    label="Session Id"
                    placeholder="OTBI Session Id"
                    value={loginDetails.sessionId || ""}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Button
                  onClick={handleLogon}
                  variant="contained"
                  className={classes.buttonHot}
                  fullWidth={false}
                  color="primary"
                >
                  Get OTBI Session Id
                </Button>
                <Button
                  onClick={getOtbi}
                  variant="contained"
                  className={classes.button}
                >
                  Run OTBI Report API
                </Button>
                <Button
                  onClick={handleLogoff}
                  variant="contained"
                  className={classes.button}
                >
                  Logoff
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
