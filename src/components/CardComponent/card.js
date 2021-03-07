import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  priceTag:{
    color:'#04942d',
    marginBottom:0,
    marginRight:'auto'
  },
  cardActionClass:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center'
  },
  loadingContainer:{
    display:'flex',
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default function ImgMediaCard(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if(props.currentUser.privileges.includes('LISTING_PRIVILEGE1')){
      alert("has prvileges")
      fetch("https://ehand-inventory-service.herokuapp.com/inventory-service/api/shops/1/items?page=0&size=10&sort=createdAt,desc")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.content);
          //alert(result.Employees);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
          alert(error);
        }
      )
    }else{
      alert("dont have previlege")
      setIsLoaded(true);
      setError("Dont have privilege to listing the items");
          // alert(error);
    }
  }, [])
  const classes = useStyles();
  


  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div className={classes.loadingContainer}>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className={classes.root}>
            <CardActionArea>
            <Link to={'/item'}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="http://www.fg.com.sg/wp-content/uploads/2017/04/corporate-gift-ideas-4.jpg"
                title="Contemplative Reptile"
              />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActionClass}>
              <Typography className={classes.priceTag} gutterBottom variant="h6" component="h2">
                $ 200
              </Typography>
              <IconButton color="secondary" aria-label="delete">
              <EditIcon />
            </IconButton>
              <IconButton color="secondary" aria-label="delete">
              <DeleteIcon />
            </IconButton>
            </CardActions>
          </Card>
          </Grid>
        ))}
      </React.Fragment>
    );
  }
}

