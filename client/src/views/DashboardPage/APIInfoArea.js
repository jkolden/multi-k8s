import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

// @material-ui/icons
import LockIcon from "@material-ui/icons/Lock";
import WifiIcon from "@material-ui/icons/Wifi";
import Favorite from "@material-ui/icons/Favorite";

const useStyles = makeStyles(productStyle);

export default function APIInfoArea() {
  const classes = useStyles();
  return (
    <div className={classNames(classes.features, classes.textCenter)}>
      <GridContainer>
        <GridItem md={4} sm={4}>
          <InfoArea
            title="Secure"
            description="API's are secured with the same authentication and authorization that protects the cloud applications. "
            icon={LockIcon}
            iconColor="info"
            vertical
          />
        </GridItem>
        <GridItem md={4} sm={4}>
          <InfoArea
            title="Flexible"
            description="Whether integrating third party applications, legacy applications or extending the Cloud, our application programmable interfaces are tailored to meet your needs."
            icon={WifiIcon}
            iconColor="success"
            vertical
          />
        </GridItem>
        <GridItem md={4} sm={4}>
          <InfoArea
            title="Popular"
            description="Learn more about why Cloud API's are consisently ranked as the most flexible and secure in the industry."
            icon={Favorite}
            iconColor="rose"
            vertical
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
