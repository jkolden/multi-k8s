/*eslint-disable*/
import React, { useState } from "react";
import axios from "axios";
import * as rssParser from "react-native-rss-parser";
import { data } from "./atomData.js";

// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Parallax from "components/Parallax/Parallax.js";

// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Accordion from "components/Accordion/Accordion.js";
import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";
import aboutUsStyle from "assets/jss/material-kit-pro-react/views/aboutUsStyle.js";
import AtomFeedFixedPlugin from "components/FixedPlugin/AtomFeedFixedPlugin";

const useStyles = makeStyles(aboutUsStyle);

export default function AtomFeedPage(props) {
  const classes = useStyles();
  const { loginDetails } = props;
  const [baseFeed, setBaseFeed] = useState({ items: [] });
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");

  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };

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
      .then(data => setBaseFeed(data));
  }

  let myDate = new Date(data.lastUpdated);

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
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer>
            <h3>{data.title}</h3>
            <h3>
              {", last updated " +
                myDate.toLocaleDateString() +
                " " +
                myDate.toLocaleTimeString()}
            </h3>

            <GridItem md={12} sm={12}>
              <ul>
                {baseFeed.items
                  .map(function(item) {
                    return {
                      id: item.id,
                      title: item.title,
                      content: JSON.parse(item.content)
                    };
                  })
                  .map(obj => (
                    <li key={obj.id}>
                      <strong>{obj.title}</strong>
                      <ul>
                        <li>
                          {obj.content["Changed Attributes"].map(changes => (
                            <li>
                              {`${Object.keys(changes)}`}
                              <ul>
                                <li>
                                  {Object.values(changes)[0].old
                                    ? `Old: ${Object.values(changes)[0].old}`
                                    : ""}
                                  {Object.values(changes)[0].new
                                    ? ` / New: ${Object.values(changes)[0].new}`
                                    : ""}
                                </li>
                              </ul>
                            </li>
                          ))}
                        </li>
                      </ul>
                    </li>
                  ))}
              </ul>
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
                        Atom feeds enable you to track changes made to
                        feed-enabled resources in Oracle Global Human Resources
                        Cloud. For any updates of interest to downstream
                        applications such as new hires, terminations, employee
                        transfers, and promotions, Oracle Global Human Resources
                        Cloud publishes Atom feeds. For this use case, the
                        Oracle HCM Cloud Adapter is configured with the Atom
                        feed Employee Update. This feed consists of three
                        updates (PrimaryPhoneNumber, CitizenshipStatus, and
                        CitizenshipId). An FTP Adapter is also configured to
                        write any feed updates to an FTP server.
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
      <AtomFeedFixedPlugin
        getData={getData}
        fixedClasses={fixedClasses}
        handleFixedClick={handleFixedClick}
      />
    </React.Fragment>
  );
}
