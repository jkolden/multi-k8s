import React from "react";
// @material-ui/icons
//import LockIcon from "@material-ui/icons/Lock";
//import WifiIcon from "@material-ui/icons/Wifi";
import Favorite from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

// core components
//import Header from "components/Header/Header.js";
//import HeaderLinks from "components/Header/HeaderLinks.js";
//import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
//import Accordion from "components/Accordion/Accordion.js";
//import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Tooltip from "@material-ui/core/Tooltip";

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

// images
import cardProject1 from "assets/img/examples/card-project1.jpg";
import cardProject2 from "assets/img/examples/card-project2.jpg";
import cardProject3 from "assets/img/examples/card-project3.jpg";
import cardProject4 from "assets/img/examples/card-project4.jpg";

const useStyles = makeStyles(productStyle);

export default function Cards() {
  const classes = useStyles();

  return (
    <div className={classes.relatedProducts}>
      <h3 className={classNames(classes.title, classes.textCenter)}>
        Other Cloud API's you may be interested in:
      </h3>
      <GridContainer>
        <GridItem sm={6} md={3}>
          <Card product>
            <CardHeader image>
              <a href="#pablo">
                <img src={cardProject1} alt="cardProject1" />
              </a>
            </CardHeader>
            <CardBody>
              <h6
                className={classNames(classes.cardCategory, classes.textRose)}
              >
                Trending
              </h6>
              <h4 className={classes.cardTitle}>HCM Employee REST API</h4>
              <div className={classes.cardDescription}>
                HCM Rest endpoints for create, read and update actions on
                employees.
              </div>
            </CardBody>
            <CardFooter className={classes.justifyContentBetween}>
              <div className={classes.stats}>
                <Tooltip
                  id="tooltip-top"
                  title="Save"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button justIcon color="rose" simple>
                    <Favorite />
                  </Button>
                </Tooltip>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem sm={6} md={3}>
          <Card product>
            <CardHeader image>
              <a href="#pablo">
                <img src={cardProject3} alt="cardProject3" />
              </a>
            </CardHeader>
            <CardBody>
              <h6 className={classes.cardCategory}>Popular</h6>
              <h4 className={classes.cardTitle}>OTBI SOAP API</h4>
              <div className={classes.cardDescription}>
                Easily download information from you cloud applications into
                custom applications.
              </div>
            </CardBody>
            <CardFooter className={classes.justifyContentBetween}>
              <div className={classes.stats}>
                <Tooltip
                  id="tooltip-top"
                  title="Save to Wishlist"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button justIcon link>
                    <Favorite />
                  </Button>
                </Tooltip>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem sm={6} md={3}>
          <Card product>
            <CardHeader image>
              <a href="#pablo">
                <img src={cardProject4} alt="cardProject4" />
              </a>
            </CardHeader>
            <CardBody>
              <h6 className={classes.cardCategory}>Popular</h6>
              <h4 className={classes.cardTitle}>HCM Atom Feed</h4>
              <div className={classes.cardDescription}>
                Stay up to date with real-time atom feeds so you never miss a
                beat.
              </div>
            </CardBody>
            <CardFooter className={classes.justifyContentBetween}>
              <div className={classes.stats}>
                <Tooltip
                  id="tooltip-top"
                  title="Save to Wishlist"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button justIcon color="rose" simple>
                    <Favorite />
                  </Button>
                </Tooltip>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem sm={6} md={3}>
          <Card product>
            <CardHeader image>
              <a href="#pablo">
                <img src={cardProject2} alt="cardProject2" />
              </a>
            </CardHeader>
            <CardBody>
              <h6
                className={classNames(classes.cardCategory, classes.textRose)}
              >
                Trending
              </h6>
              <h4 className={classes.cardTitle}>HCM Data Loader</h4>
              <div className={classes.cardDescription}>
                Easily upload text files using the HCM Data Loader API.
              </div>
            </CardBody>
            <CardFooter className={classes.justifyContentBetween}>
              <div className={classes.stats}>
                <Tooltip
                  id="tooltip-top"
                  title="Save to Wishlist"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button justIcon link>
                    <Favorite />
                  </Button>
                </Tooltip>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
