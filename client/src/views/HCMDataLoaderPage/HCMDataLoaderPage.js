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
  const [essId, setEssId] = useState();
  const [contentId, setContentId] = useState();

  const classes = useStyles();
  const { loginDetails } = props;
  const { instance, password, user } = loginDetails;

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
    const data = new FormData();

    data.append("instance", instance);
    data.append("password", password);
    data.append("user", user);
    data.append("datfile", file[0]);

    fetch("/api/file-upload", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      body: data
    })
      .then(resp => resp.json())
      .then(data => setContentId(data.contentId))
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
            <GridItem md={12} sm={12}>
              <h3>File Upload</h3>
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
            </GridItem>
            <GridItem md={6} sm={6}>
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
              <Button onClick={handleImportAndLoad}>
                Run Import and Load Data
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
                        Provides external operations for ERP integration
                        scenarios to execute end-to-end inbound and outbound
                        data flows. It also tracks the status of inbound and
                        outbound data processes.
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
