import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import VectorMapView from "../Components/VectorMapView";
import TotalEmpInfoTile from "../Components/TotalEmpInfoTile";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  button: {
    margin: theme.spacing(1),
    width: "200px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    float: "right"
  },
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

export default function Otbi() {
  const [sessionId, setSessionId] = useState();
  const [otbiData, setOtbiData] = useState([]);
  const [mapData, setMapData] = useState();
  const [loginDetails, setLoginDetails] = useState({
    instance: "",
    password: "",
    user: ""
  });
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleChange = name => event => {
    setLoginDetails({
      ...loginDetails,
      [name]: event.target.value
    });
  };

  async function handleClick() {
    await fetch("/api/otbi", {
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
      .then(data => setSessionId(data.sessionId));
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
      body: JSON.stringify({ sessionId: sessionId })
    })
      .then(resp => resp.json())
      .then(data => setOtbiData(data));
  }

  function groupByCountry() {
    let obj = {};
    for (let i = 0; i < otbiData.length; i++) {
      let country = otbiData[i].Column5;
      if (obj[country]) {
        obj[country] = obj[country] + 1;
      } else {
        obj[country] = 1;
      }
    }
    setMapData(obj);
  }

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={classes.paper}>
              <TotalEmpInfoTile
                employees={otbiData}
                title={"Total Employees"}
              />
            </Paper>
          </Grid>
          {/* OTBI Session Id */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={classes.paper}>
              <TextField
                id="session-id"
                label="Session Id"
                type="text"
                className={classes.textField}
                placeholder="OTBI Session Id"
                value={sessionId || ""}
                margin="normal"
                variant="outlined"
                fullwidth
              />

              <TextField
                onChange={handleChange("instance")}
                className={classes.textField}
                name="instance"
                value={loginDetails.instance || ""}
                type="text"
                label="Instance"
                margin="normal"
                variant="outlined"
                placeholder="adc4-zhot"
                fullWidth
              />
              <TextField
                onChange={handleChange("password")}
                className={classes.textField}
                name="password"
                value={loginDetails.password || ""}
                type="text"
                label="Password"
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <TextField
                onChange={handleChange("user")}
                className={classes.textField}
                name="user"
                value={loginDetails.user || ""}
                type="text"
                label="User Name"
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={classes.buttonContainer}>
              <Button
                onClick={handleClick}
                variant="contained"
                className={classes.button}
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
                onClick={groupByCountry}
                variant="contained"
                className={classes.button}
              >
                Update Map
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper>
              <VectorMapView mapData={mapData} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
