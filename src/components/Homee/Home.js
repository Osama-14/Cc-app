import React, { useEffect, useState } from "react";
import { db, getDocs, collection, query, where } from "../../Config";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useNavigate } from "react-router-dom";
import Searchpeople from "../Search-people/SearchPeople";

import "./home.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",

    width: "400px",
    height: "400px",
    objectFit: "cover",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Home = ({ ...props }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("============", props);
    getPostFromFirebase();
  }, []);

  const getPostFromFirebase = async () => {
    setPosts([]);
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshotsi
      let obj = doc.data();
      obj.key = doc.id;
      console.log(doc.id, " => ", doc.data());
      console.log(obj);
      setPosts((earlierPosts) => [...earlierPosts, obj]);
    });
  };

  const getData = async (val) => {
    setPosts([]);

    const q = await query(
      collection(db, "posts"),
      where("username", "==", val.target.value)
    );

    const querySnapshot = await getDocs(q);
    console.log("query", querySnapshot.empty);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let obj = doc.data();
      obj.key = doc.id;
      console.log(doc.id, " => ", doc.data());
      console.log(obj);
      setPosts((earlierPosts) => [...earlierPosts, obj]);
        });

  };

  return (
    <div className="containerr">
      <Searchpeople getData={getData} />
      {posts.map((val, ind) => {
        return (
          <div key={ind} onClick={() => navigate(`/profile/${val.uid}`)}>
            <Card className="card-bottom" className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                  ></Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={val.username}
                subheader={new Date(val.currentTime).toLocaleDateString()}
              />

              <CardMedia
                className={classes.media}
                image={val.image}
                title={val.title}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                ></Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph> {val.title}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
