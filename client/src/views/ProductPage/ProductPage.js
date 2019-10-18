/*eslint-disable*/
import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Parallax from "components/Parallax/Parallax.js";

// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Accordion from "components/Accordion/Accordion.js";
import VectorMapView from "components/Map/VectorMapView.js";
import EmployeesTable from "components/Tables/EmployeesTable.js";
import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";
import aboutUsStyle from "assets/jss/material-kit-pro-react/views/aboutUsStyle.js";

const useStyles = makeStyles(aboutUsStyle);

export default function ProductPage(props) {
  const [otbiData, setOtbiData] = useState([]);
  const [mapData, setMapData] = useState();
  const [sessionId, setSessionId] = useState();
  const [tableData, setTableData] = useState([]);
  const { loginDetails, setLoginDetails } = props;
  const classes = useStyles();

  function handleLogoff() {
    fetch("/api/otbi-logoff", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...loginDetails, sessionId })
    })
      .then(resp => resp.json())
      .then(data => setSessionId(data))
      .then(setOtbiData([]))
      .then(setMapData({}))
      .then(setTableData([]));
  }

  function doLogon() {
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
      body: JSON.stringify({ ...loginDetails, sessionId })
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
      .slice(0, 7);

    setTableData(result);
  }

  return (
    <React.Fragment>
      <Parallax
        image={require("assets/img/examples/city.jpg")}
        filter="dark"
        small
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <h1 className={classes.title}>
                Seamlessly Access Data from Transactional Business Intelligence
              </h1>
              <h4>This is the Oracle Anayltics API</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem md={6} sm={6}>
              <h4>Top Countries</h4>

              <EmployeesTable tableData={tableData} />
            </GridItem>
            <GridItem md={6} sm={6}>
              <h4>Global employee distribution</h4>
              <VectorMapView mapData={mapData} />
            </GridItem>
            <GridItem md={6} sm={6}>
              <TextField
                id="session-id"
                label="OTBI Session Id"
                placeholder="OTBI Session Id"
                value={sessionId || ""}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <Button onClick={doLogon} fullWidth={false} color="primary">
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
            </GridItem>
            <GridItem md={12} sm={12}>
              <Accordion
                active={0}
                activeColor="dark"
                collapses={[
                  {
                    title: "API Description",
                    content: (
                      <p>
                        The Oracle Business Intelligence Session-Based Web
                        Services are an application programming interface (API)
                        that implements SOAP. These web services are designed
                        for programmatic use, where you use one web service for
                        invoking many different business intelligence objects.
                        These web services also provide functionality on a wide
                        range of Presentation Services operations.
                      </p>
                    )
                  },
                  {
                    title: "Payloads",
                    content: (
                      <p>
                        An infusion of West Coast cool and New York attitude,
                        Rebecca Minkoff is synonymous with It girl style.
                        Minkoff burst on the fashion scene with her best-selling{" "}
                        {"'"}
                        Morning After Bag{"'"} and later expanded her offering
                        with the Rebecca Minkoff Collection - a range of luxe
                        city staples with a {'"'}
                        downtown romantic{'"'} theme.
                      </p>
                    )
                  },
                  {
                    title: "Details and Documentation",
                    content: (
                      <ul>
                        <li>Storm and midnight-blue stretch cotton-blend</li>
                        <li>
                          Notch lapels, functioning buttoned cuffs, two front
                          flap pockets, single vent, internal pocket
                        </li>
                        <li>Two button fastening</li>
                        <li>84% cotton, 14% nylon, 2% elastane</li>
                        <li>Dry clean</li>
                      </ul>
                    )
                  }
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </React.Fragment>
  );
}
