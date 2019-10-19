/*eslint-disable*/
import React, { useState } from "react";
import axios from "axios";
import * as rssParser from "react-native-rss-parser";

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
import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";
import aboutUsStyle from "assets/jss/material-kit-pro-react/views/aboutUsStyle.js";

const useStyles = makeStyles(aboutUsStyle);

export default function AtomFeedPage(props) {
  const classes = useStyles();
  const { loginDetails } = props;
  const [baseFeed, setBaseFeed] = useState({});
  const [feed, setFeed] = useState([]);

  function getData() {
    fetch("/api/atom", {
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
      .then(data => console.log(data));
  }

  function dataTransform() {
    axios
      .post(
        "http://multidocker-env.rjfhnjaucw.us-west-2.elasticbeanstalk.com/api/atom",
        {
          //method: "POST",
          // mode: "no-cors", // no-cors, *cors, same-origin
          // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          // credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ loginDetails: loginDetails })
        }
      )
      .then(resp => resp.json())
      .then(data => console.log("hi"));
  }

  return (
    <React.Fragment>
      <Parallax image={require("assets/img/bg0.jpg")} filter="dark" small>
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
                Stay Current with Real-time Atom Feeds
              </h1>
              <h4>This is the Atom Feed API</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer>
            <h1>{baseFeed.title}</h1>
            <GridItem md={12} sm={12}>
              <ul>
                {feed.map(item => (
                  <li>{item.Context[0].WorkEmail}</li>
                ))}
              </ul>
            </GridItem>
            <GridItem md={12} sm={12}>
              <Button onClick={() => getData()}>Get Feed</Button>
            </GridItem>
            <GridItem md={12} sm={12}>
              <Accordion
                active={0}
                activeColor="primary"
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
