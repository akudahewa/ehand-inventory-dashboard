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
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import DrawerComponent from "../components/Drawer/drawer";
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
    background:'#fff',
    width:60,
    left:0,
    height:64,
    boxShadow:'none',
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      background:'#259392',
      display:'none',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginTop:8,
    color:'#259392',
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
  searchDiv: {
    width: "100%",
    paddingBottom: "35px",
    paddingTop: "10px",
    display: "flex",
    justifyContent: "flex-end",
  },
  formClass: {
    width: "100%",
    maxWidth: "700px",
  },
  formRow: {
    marginBottom: "15px",
    marginTop: "15px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  input: {
    display: "none",
  },
  imageBlock: {
    width: "100%",
    border: "1px solid #b7b7b7",
    marginLeft: "8px",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  uploadButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
  imageGrid: {
    display: "flex",
  },
}));

function AddItem(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const MyAlert = () => { 
      setIsLoading(true);
      // POST request using fetch inside useEffect React hook
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: itemName,
          description: itemDescription,
          price: itemPrice,
        }),
      };
      fetch(
        "https://ehand-inventory-service.herokuapp.com/inventory-service/api/shops/1/items",
        requestOptions
      ).then((response) => response.json());
      setIsLoading(false);

      // empty dependency array means this effect will only run once (like componentDidMount in classes)
    
  };

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
          <Typography style={{color:'#fff'}} variant="h6" noWrap>
            Add Item
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
        <form className={classes.formClass} noValidate autoComplete="off">
          <div className={classes.formRow}>
            <TextField
              id="outlined-full-width"
              label="Item Name"
              style={{ margin: 8 }}
              placeholder="Type item name"
              //helperText="Full width!"
              fullWidth
              margin="normal"
              value={itemName}
              onInput={(e) => setItemName(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </div>
          <div className={classes.formRow}>
            <TextField
              id="outlined-full-width"
              label="Item Description"
              style={{ margin: 8 }}
              placeholder="Type item description"
              value={itemDescription}
              onInput={(e) => setItemDescription(e.target.value)}
              //helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              rows={4}
              multiline
            />
          </div>
          <div className={classes.formRow}>
            <TextField
              id="outlined-full-width"
              label="Item Price"
              style={{ margin: 8 }}
              placeholder="Type item price"
              value={itemPrice}
              onInput={(e) => setItemPrice(e.target.value)}
              //helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">£</InputAdornment>
                ),
              }}
            />
          </div>
          <div className={classes.formRow}>
            <div className={classes.imageBlock}>
              <div className={classes.imageGrid}>
                <div className={classes.singleImage}></div>
              </div>
              <div className={classes.uploadButton}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" style={{background:'#259392', color:'#fff'}} component="span">
                    Upload
                  </Button>
                </label>
              </div>
            </div>
          </div>

          <Button variant="contained" style={{background:'#259392', color:'#fff'}} onClick={MyAlert}>
            Add Item
          </Button>
        </form>
      </main>
    </div>
  );
}

export default AddItem;
