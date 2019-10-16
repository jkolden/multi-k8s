/*!
=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import Paper from "@material-ui/core/Paper";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

class VectorMapView extends React.Component {
  render(props) {
    const { mapData } = this.props;
    return (
      <div className="map map-big" id="worldMap">
        <Paper>
          <VectorMap
            map={"world_mill"}
            backgroundColor="transparent"
            zoomOnScroll={false}
            containerStyle={{
              width: "100%",
              height: "420px"
            }}
            onRegionTipShow={function(e, el, code) {
              el.html(el.html() + " (Employees: " + mapData[code] + ")");
            }}
            regionStyle={{
              initial: {
                fill: "#e4e4e4",
                "fill-opacity": 0.9,
                stroke: "none",
                "stroke-width": 0,
                "stroke-opacity": 0
              }
            }}
            series={{
              regions: [
                {
                  values: mapData,
                  scale: ["#59b2c4", "#17515c"],
                  normalizeFunction: "polynomial"
                }
              ]
            }}
          />
        </Paper>
      </div>
    );
  }
}

export default VectorMapView;
