import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DrawerComponent from "../components/Drawer/drawer";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    padding: "10px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  priceDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  priceAmount: {
    color: "red",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
  },
  marginLR:{
      marginLeft:15,
      marginRight:15
  },
  imageClass:{
      width:'100%',
      maxWidth:500,
      marginTop:25,
      borderRadius:5
  },
  buttonDiv:{
      marginTop:20,
      display:'flex',
      justifyContent:'flex-end'
  }
}));

function SingleItem(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  //   const [isLoading, setIsLoading] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //   const MyAlert = () => {
  //       setIsLoading(true);
  //       // POST request using fetch inside useEffect React hook
  //       const requestOptions = {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           name: itemName,
  //           description: itemDescription,
  //           price: itemPrice,
  //         }),
  //       };
  //       fetch(
  //         "https://ehand-inventory-service.herokuapp.com/inventory-service/api/shops/1/items",
  //         requestOptions
  //       ).then((response) => response.json());
  //       setIsLoading(false);

  //       // empty dependency array means this effect will only run once (like componentDidMount in classes)

  //   };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Item Details
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <DrawerComponent />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <DrawerComponent />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={5}>
            <img
              alt="ItemImage"
              src="http://www.fg.com.sg/wp-content/uploads/2017/04/corporate-gift-ideas-4.jpg"
              className={classes.imageClass}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={7}>
            <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              lacinia ex vitae pretium sodales. Nam eget elit sed libero
              pulvinar semper.
            </h2>
            <p>
              Suspendisse mattis dignissim est. Curabitur mattis sapien magna,
              et accumsan sem tincidunt sit amet. Nam euismod orci ut orci
              luctus consectetur. Etiam eget tortor ac mauris consectetur
              imperdiet eget nec nisl. Aenean vehicula facilisis felis in
              varius. Cras finibus ultrices nunc quis aliquet. Vestibulum id leo
              eget risus sagittis mollis. Phasellus dapibus, mauris nec
              consequat dictum, ligula dui auctor ipsum, tincidunt semper leo
              nulla eget ipsum. Vivamus velit lorem, tincidunt eu hendrerit nec,
              elementum quis dolor. Cras euismod aliquet libero, id hendrerit
              nisl. Quisque laoreet rutrum tincidunt. Curabitur at aliquet
              metus, a maximus mi. Nunc mi purus, pretium eu dignissim et,
              faucibus eget dui.
            </p>
            <div className={classes.priceDiv}>
              <div>Price - </div>
              <div className={classes.priceAmount}>$ 100</div>
            </div>

            <div className={classes.buttonDiv}>
              <Button variant="contained" component={Link} to={"/home"}>Back</Button>
              <Button className={classes.marginLR} variant="contained" color="primary">
                Edit
              </Button>
              <Button variant="contained" color="secondary">
                Delete
              </Button>
            </div>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default SingleItem;
