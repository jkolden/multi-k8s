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

  const classes = useStyles();
  const { instance, password, user } = props.loginDetails;

  const handleUpload = () => {
    const payload = {
      instance,
      password,
      user,
      datfile: file[0]
    };

    fetch("/api/file-upload", {
      headers: {
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(payload)
    }).then(function(response) {
      console.log(response);
    });
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
            <h4>.dat File Upload</h4>
            <GridItem md={12} sm={12}></GridItem>
            <div className={classes.divContainer}>
              <DropZone handleFile={handleFile} />
            </div>
            <GridItem md={12} sm={12}>
              <Button color="primary" onClick={handleUpload}>
                Load to HCM Cloud
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </React.Fragment>
  );
}
