import React, { useState } from "react";

import data from "assets/data/empData";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// core components
import Accordion from "components/Accordion/Accordion.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import DropZone from "components/DropZone/DropZone.js";

import EmployeeCard from "./EmployeeCard";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/productsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionProducts(props) {
  const { loginDetails } = props;
  const [selectedRecord, setSelectedRecord] = useState({});
  const [hcmData, setHcmData] = useState([]);
  const [changedRecord, setChangedRecord] = useState({});
  const [file, setFile] = useState();

  const [lastName, setLastName] = useState();

  const handleFile = file => {
    setFile(file);
  };

  function getData() {
    fetch("/api/hcm", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loginDetails: loginDetails,
        lastName: lastName
      })
    })
      .then(resp => resp.json())
      .then(data => setHcmData(data.items));
  }

  const handleChange = name => event => {
    setLastName(event.target.value);
  };

  const handleChangedRecord = name => event => {
    setChangedRecord({ ...changedRecord, [name]: event.target.value });
  };

  function updateEmployee() {
    fetch("/api/hcm-update", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loginDetails: loginDetails,
        url: selectedRecord.links[0].href,
        payload: changedRecord
      })
    })
      .then(resp => resp.json())
      .then(data => console.log(data));
  }

  const uploadImage = () => {
    const data = new FormData();

    data.append("password", loginDetails.password);
    data.append("image", file[0]);

    data.append(
      "url",
      selectedRecord.photo.length > 0
        ? selectedRecord.photo[0].links[0].href
        : `${selectedRecord.links[0].href}/child/photo`
    );

    data.append("method", selectedRecord.photo.length > 0 ? "PATCH" : `POST`);

    // Display the key/value pairs
    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    fetch("/api/hcm-image-upload", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      body: data
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2>HCM Employees API</h2>
        <GridContainer>
          <GridItem md={3} sm={3}>
            <Card plain>
              <CardBody className={classes.cardBodyRefine}>
                <h4 className={classes.cardTitle + " " + classes.textLeft}></h4>
                <Accordion
                  active={[0]}
                  activeColor="info"
                  collapses={[
                    {
                      title: "Query Parameters",
                      content: (
                        <CardBody className={classes.cardBodyRefine}>
                          <TextField
                            placeholder="Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={handleChange("lastName")}
                            fullWidth
                          />
                          <br />
                          <br />
                          <Button color="info" onClick={getData}>
                            Get HCM Data
                          </Button>
                        </CardBody>
                      )
                    }
                  ]}
                />
                <Accordion
                  active={[0]}
                  activeColor="info"
                  collapses={[
                    {
                      title: "Edit Employee Record",
                      content: (
                        <CardBody className={classes.cardBodyRefine}>
                          <h4>{selectedRecord.DisplayName}</h4>
                          <TextField
                            value={changedRecord.WorkPhoneAreaCode}
                            fullWidth
                            placeholder={selectedRecord.WorkPhoneAreaCode}
                            onChange={handleChangedRecord("WorkPhoneAreaCode")}
                          />
                          <TextField
                            value={changedRecord.WorkPhoneNumber}
                            fullWidth
                            placeholder={selectedRecord.WorkPhoneNumber}
                            onChange={handleChangedRecord("WorkPhoneNumber")}
                          />
                          <TextField
                            placeholder={selectedRecord.WorkEmail}
                            name="WorkEmail"
                            fullWidth
                            value={changedRecord.WorkEmail}
                            onChange={handleChangedRecord("WorkEmail")}
                          />
                          <br />
                          <br />
                          <Button onClick={updateEmployee} color="info">
                            Update HCM Data
                          </Button>
                        </CardBody>
                      )
                    }
                  ]}
                />
                <Accordion
                  active={[0]}
                  activeColor="info"
                  collapses={[
                    {
                      title: "Add Employee Photo",
                      content: (
                        <CardBody className={classes.cardBodyRefine}>
                          <DropZone
                            handleFile={handleFile}
                            message={`Drag and drop a photo here or click to select a photo from your local file system.`}
                          />
                          <br />
                          <br />
                          <Button onClick={uploadImage} color="info">
                            Load Image
                          </Button>
                        </CardBody>
                      )
                    }
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={9} sm={9}>
            <GridContainer>
              {hcmData.map(person => (
                <EmployeeCard
                  person={person}
                  selectedRecord={selectedRecord}
                  setSelectedRecord={setSelectedRecord}
                />
              ))}
            </GridContainer>
          </GridItem>
        </GridContainer>
        <br />
      </div>
    </div>
  );
}
