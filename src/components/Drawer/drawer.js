import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import AddBoxIcon from '@material-ui/icons/AddBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    padding:'10px'
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:'30px'
  },
  logoImage: {
    height: "20%",
    width: "100%",
    maxWidth: "120px",
  },
}));



export default function DrawerComponent() {
  const classes = useStyles();
 
  return (
    <div>
      <div className={classes.toolbar} />
      <div className={classes.logoContainer}>
        <img
          src="https://images.squarespace-cdn.com/content/v1/5c527a573917ee2ea23f101e/1557293666103-96AL5WCEJKQLMKAGNGGL/ke17ZwdGBToddI8pDm48kBJtFj50fCbyPgUDBuFdb2N7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0oFRqRlJVRbOuKXSH8XSdc98H4EODMcT14R9XQSd05g19KOCKEuBLph9oaLAq824RA/Logo.png"
          alt="BigCo Inc. logo"
          className={classes.logoImage}
        />
      </div>
      <Divider />
      <List>
        <ListItem button={true} {...{ component: NavLink, to: "/home" }}>
          <ListItemIcon>
            <DashboardIcon style={{ color: '#038b8d' }} />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        <ListItem button={true} {...{ component: NavLink, to: "/additem" }}>
          <ListItemIcon>
            <AddBoxIcon style={{ color: '#069d26' }} />
          </ListItemIcon>
          <ListItemText>Add Item</ListItemText>
        </ListItem>
        <ListItem button={true} {...{ component: NavLink, to: "/signin" }}>
          <ListItemIcon>
            <ExitToAppIcon style={{ color: '#ff212b' }} />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </List>
    </div>
  );
}
