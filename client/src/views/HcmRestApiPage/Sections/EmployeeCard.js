import React, { useEffect, useState } from "react";

import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Button from "components/CustomButtons/Button.js";
import Tooltip from "@material-ui/core/Tooltip";

import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function EmployeeCard(props) {
  const { person, selectedRecord, setSelectedRecord, loginDetails } = props;

  useEffect(() => {
    if (person.photo[0]) {
      fetch(person.photo[0].links[3].href, {
        mode: "no-cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: new Headers({
          Authorization:
            "Basic " +
            new Buffer(
              loginDetails.user + ":" + loginDetails.password
            ).toString("base64")
        })
      })
        .then(response => response.blob())
        .then(
          image =>
            (document.getElementById(
              `${person.PersonId}`
            ).src = URL.createObjectURL(image))
        );
    } else {
      document.getElementById(
        `${person.PersonId}`
      ).src = `https://www.paskettpr.co.uk/wp-content/uploads/2017/12/8iz8Eozip.jpg`;
    }
  }, [props]);

  function handleSelection(person) {
    setSelectedRecord({ ...person });
    console.log("person selected", person);
  }

  const classes = useStyles();
  return (
    <GridItem md={4} sm={4}>
      <Card plain product className={classes.cardHover}>
        <CardHeader image plain className={classes.cardHeaderHover}>
          <img
            height="254"
            width="254"
            id={person.PersonId}
            src=""
            alt="photo"
          />
        </CardHeader>
        <CardBody plain>
          <div className={classes.cardHoverUnder}>
            <Tooltip
              id="tooltip-top"
              title="Refresh"
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button simple color="info" justIcon>
                <Refresh className={classes.underChartIcons} />
              </Button>
            </Tooltip>
            <Tooltip
              id="tooltip-top"
              title="Edit Record API"
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button
                color="transparent"
                simple
                justIcon
                onClick={() => handleSelection(person)}
              >
                <Edit className={classes.underChartIcons} />
              </Button>
            </Tooltip>
          </div>
          <div>
            <h4 className={classes.cardTitleAlt}>{person.DisplayName}</h4>
            {person.Country ? (
              <img
                className={classes.flag}
                alt="country flag"
                src={`https://www.countryflags.io/${person.Country}/flat/24.png`}
              />
            ) : (
              <div />
            )}
          </div>

          <p className={classes.clearFloatLeft}>
            {`${person.assignments[0].AssignmentName}, ${
              person.City ? person.City : "No city listed"
            }`}
            <br></br>
            {`${
              !(person.WorkPhoneAreaCode || person.WorkPhoneNumber)
                ? "No number on file"
                : person.WorkPhoneNumber
            }`}
          </p>
        </CardBody>
        <CardFooter plain className={classes.justifyContentBetween}>
          <div className={classes.priceContainer}></div>
        </CardFooter>
      </Card>
    </GridItem>
  );
}
