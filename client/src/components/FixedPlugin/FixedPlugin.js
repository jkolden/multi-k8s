/*eslint-disable*/
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

import styles from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";

import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

export default function FixedPlugin(props) {
  const disabled = !(
    props.loginDetails.instance.length &&
    props.loginDetails.password.length &&
    props.loginDetails.user.length
  );
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
            <Button
              color="info"
              onClick={props.doLogon}
              disabled={disabled && !props.sessionId}
            >
              Get Session Id
            </Button>
            <div className="clearfix" />
          </li>
          <li className="adjustments-line">
            <Button
              color="info"
              onClick={props.getOtbi}
              disabled={disabled && !props.sessionId.length}
            >
              Run Report API
            </Button>
            <div className="clearfix" />
          </li>
          <li className="adjustments-line">
            <Button onClick={props.handleLogoff}>Logoff</Button>
            <div className="clearfix" />
          </li>
          <li className="header-title"></li>
        </ul>
      </div>
    </div>
  );
}

FixedPlugin.propTypes = {
  loginDetails: PropTypes.object,
  sessionId: PropTypes.string,
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  doLogon: PropTypes.func,
  getOtbi: PropTypes.func,
  handleLogoff: PropTypes.func,
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
