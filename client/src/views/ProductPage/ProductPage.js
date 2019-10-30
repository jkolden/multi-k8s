/*eslint-disable*/
import React, { useState } from "react";

// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Parallax from "components/Parallax/Parallax.js";

import OtbiPayload from "components/PayloadInfo/OtbiPayload";

// core components

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Accordion from "components/Accordion/Accordion.js";
import VectorMapView from "components/Map/VectorMapView.js";
import EmployeesTable from "components/Tables/EmployeesTable.js";
import aboutUsStyle from "assets/jss/material-kit-pro-react/views/aboutUsStyle.js";

const useStyles = makeStyles(aboutUsStyle);

export default function ProductPage(props) {
  const [otbiData, setOtbiData] = useState([]);
  const [mapData, setMapData] = useState({});
  const [sessionId, setSessionId] = useState("");
  const [tableData, setTableData] = useState([]);
  const { loginDetails, setLoginDetails } = props;

  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const classes = useStyles();

  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };

  function handleLogoff() {
    loginDetails.sessionId = sessionId;
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
      .then(data => setSessionId(""))
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
    loginDetails.sessionId = sessionId;
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
      .slice(0, 6);

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
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <GridContainer>
        <GridItem xs={12}>
          <Card className={classes.card}>
            <CardHeader icon>
              <h4 className={classes.cardIconTitle}>
                Global Employees by Top Locations
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify="space-between">
                <GridItem xs={12} sm={12} md={5}>
                  <EmployeesTable tableData={tableData} />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <VectorMapView mapData={mapData} />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    id="session-id"
                    label="OTBI Session Id"
                    placeholder="OTBI Session Id"
                    value={sessionId || ""}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />
                </GridItem>
                <GridItem md={12} sm={12}>
                  <OtbiPayload />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <FixedPlugin
        loginDetails={loginDetails}
        fixedClasses={fixedClasses}
        handleFixedClick={handleFixedClick}
        doLogon={doLogon}
        getOtbi={getOtbi}
        handleLogoff={handleLogoff}
        sessionId={sessionId}
      />
    </React.Fragment>
  );
}
