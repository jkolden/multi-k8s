/*eslint-disable*/
import React, { useState } from "react";

// nodejs library that concatenates classes
// react component used to create nice image meadia player
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Accordion from "components/Accordion/Accordion.js";
import aboutUsStyle from "assets/jss/material-kit-pro-react/views/aboutUsStyle.js";

export default function OtbiPayload(props) {
  return (
    <React.Fragment>
      <Accordion
        active={0}
        activeColor="info"
        collapses={[
          {
            title: "Cloud Analytics API",
            content: (
              <p>
                The Oracle Business Intelligence Session-Based Web Services are
                an application programming interface (API) that implements SOAP.
                These web services are designed for programmatic use, where you
                use one web service for invoking many different business
                intelligence objects. These web services also provide
                functionality on a wide range of Presentation Services
                operations.
              </p>
            )
          },
          {
            title: "Payloads",
            content: (
              <p>
                An infusion of West Coast cool and New York attitude, Rebecca
                Minkoff is synonymous with It girl style. Minkoff burst on the
                fashion scene with her best-selling {"'"}
                Morning After Bag{"'"} and later expanded her offering with the
                Rebecca Minkoff Collection - a range of luxe city staples with a{" "}
                {'"'}
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
                  Notch lapels, functioning buttoned cuffs, two front flap
                  pockets, single vent, internal pocket
                </li>
                <li>Two button fastening</li>
                <li>84% cotton, 14% nylon, 2% elastane</li>
                <li>Dry clean</li>
              </ul>
            )
          }
        ]}
      />
    </React.Fragment>
  );
}
