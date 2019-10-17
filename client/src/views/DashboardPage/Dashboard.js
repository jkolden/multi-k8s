/*eslint-disable*/
import React, { useState } from "react";
import { Route } from "react-router";
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

//content pages
import ProductPage from "views/ProductPage/ProductPage";
import HCMDataLoaderPage from "views/HCMDataLoaderPage/HCMDataLoaderPage";

// core components
import Header from "components/Header/Header.js";
// sections for this page
import Cards from "./Cards";
import HeaderLinks from "components/Header/HeaderLinks.js";
import APIInfoArea from "./APIInfoArea";
import DashboardFooter from "./DashboardFooter";

import aboutUsStyle from "assets/jss/material-kit-pro-react/views/aboutUsStyle.js";

const useStyles = makeStyles(aboutUsStyle);

export default function Dashboard() {
  const [loginDetails, setLoginDetails] = useState({
    instance: "",
    password: "",
    user: "",
    sessionId: ""
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const classes = useStyles();
  return (
    <div>
      <Header
        brand="Oracle Cloud Integration Portal"
        loginDetails={loginDetails}
        setLoginDetails={setLoginDetails}
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 300,
          color: "dark"
        }}
      />

      <Route
        path="/dashboard"
        render={() => (
          <ProductPage
            loginDetails={loginDetails}
            setLoginDetails={setLoginDetails}
          />
        )}
      />
      <Route
        path="/data-loader"
        render={() => (
          <HCMDataLoaderPage
            loginDetails={loginDetails}
            setLoginDetails={setLoginDetails}
          />
        )}
      />

      <APIInfoArea />
      <Cards />
      <DashboardFooter />
    </div>
  );
}
