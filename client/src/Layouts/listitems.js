import React from "react";
import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BarChartIcon from "@material-ui/icons/BarChart";
import PersonAdd from "@material-ui/icons/PersonAdd";
import PublicIcon from '@material-ui/icons/Public';
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  list: {
    marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset"
  },
  item: {
    "position": "relative",
    "display": "block",
    "textDecoration": "none",
    "&:hover,&:focus,&:visited,&": {
      color: "black"
    }
  },
  active: {
    "background": "#415362",
    "color": "white",
    "&:hover,&:focus,&:visited,& *, &": {
      color: "white"
    }
  }
}));

const navItems = [
  {
    path: "/dashboard",
    text: "Dashboard",
    icon: <DashboardIcon />
  },
  { path: "/analytics", text: "Analytics", icon: <BarChartIcon /> },
  {
    path: "/entry",
    text: "Entry Form",
    icon: <PersonAdd />
  },
  {
    path: "/otbi",
    text: "OTBI",
    icon: <PublicIcon />
  }
];

export default function MainListItems() {
  const classes = useStyles();

  return (
    <div>
      <List className={classes.list}>
        {navItems.map(function(item) {
          return (
            <NavLink
              activeClassName={classes.active}
              className={classes.item}
              to={item.path}
              key={item.text}
            >
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </NavLink>
          );
        })}
        ;
      </List>
    </div>
  );
}