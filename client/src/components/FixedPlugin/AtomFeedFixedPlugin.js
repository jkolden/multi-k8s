/*eslint-disable*/
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";

import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

export default function AtomFeedFixedPlugin(props) {
  const [classes, setClasses] = React.useState("dropdown show");

  const handleClick = () => {
    props.handleFixedClick();
  };

  const classesObj = useStyles();
  return (
    <div
      className={"fixed-plugin" + (props.rtlActive ? " fixed-plugin-rtl" : "")}
    >
      <div id="fixedPluginClasses" className={props.fixedClasses}>
        <div onClick={handleClick}>
          <i className="fa fa-cog fa-2x" />
        </div>
        <ul className="dropdown-menu">
          <li className="header-title">Actions</li>

          <li className="adjustments-line">
            <Button onClick={props.getData}>Get Atom Feed</Button>
            <div className="clearfix" />
          </li>

          <li className="header-title"></li>
        </ul>
      </div>
    </div>
  );
}

AtomFeedFixedPlugin.propTypes = {
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  getData: PropTypes.func,
  miniActive: PropTypes.bool,
  fixedClasses: PropTypes.string,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose"
  ]),
  handleBgColorClick: PropTypes.func,
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func,
  sidebarMinimize: PropTypes.func,
  rtlActive: PropTypes.bool
};
