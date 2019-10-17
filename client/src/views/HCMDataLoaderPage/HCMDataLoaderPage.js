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
import FormControl from "@material-ui/core/FormControl";
import DropZone from "components/DropZone/DropZone.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Accordion from "components/Accordion/Accordion.js";
import VectorMapView from "components/Map/VectorMapView.js";
import EmployeesTable from "components/Tables/EmployeesTable.js";
import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";
import aboutUsStyle from "assets/jss/material-kit-pro-react/views/aboutUsStyle.js";

const useStyles = makeStyles(aboutUsStyle);

export default function HCMDataLoaderPage(props) {
  const [file, setFile] = useState();
  const [essId, seEssId] = useState();
  const [contentId, setContentId] = useState();

  const classes = useStyles();
  const { instance, password, user } = props.loginDetails;

  const handleChange = () => event => {
    setContentId(event.target.value);
  };

  function handleImportAndLoad() {
    fetch("/api/importAndLoad", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        instance,
        user,
        password,
        contentId
      })
    })
      .then(resp => resp.json())
      .then(data => setEssId(data.essId));
  }

  const handleUpload = () => {
    const payload = {
      instance,
      password,
      user,
      datfile: file[0]
    };

    fetch(
      "http://multidocker-env.rjfhnjaucw.us-west-2.elasticbeanstalk.com/api/file-upload",
      {
        headers: {
          "Content-type": "application/json"
        },
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        mimeType: "multipart/form-data",
        crossDomain: true,
        body: JSON.stringify(payload)
      }
    )
      .then(function(response) {
        console.log(response);
      })
      .catch(err => console.log(err));
  };

  const handleFile = file => {
    setFile(file);
  };

  return (
    <React.Fragment>
      <Parallax image={require("assets/img/dg2.jpg")} filter="dark" small>
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
              <h1 className={classes.title}>Easily Upload Data</h1>
              <h4>This is the HCM Data Loader API</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem md={6} sm={6}>
              <h3>.dat File Upload</h3>
              <DropZone handleFile={handleFile} />
            </GridItem>
            <GridItem md={6} sm={6}>
              <TextField
                id="Document Id"
                onChange={handleChange()}
                label="UCM Document Id"
                placeholder="UCM Document Id"
                value={contentId || ""}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="ess Id"
                label="Ess Id"
                placeholder="Ess Id"
                value={essId || ""}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </GridItem>
            <GridItem md={12} sm={12}>
              <Button color="primary" onClick={handleUpload}>
                Load to HCM Cloud
              </Button>
              <Button onClick={handleUpload}>Run Import and Load Data</Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </React.Fragment>
  );
}
