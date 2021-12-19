import React, { useEffect, useState } from "react";
import { db, getDocs, collection, query, where, auth } from "../../Config";
import Cover from "../../images/cover.jpg";
import Profile from "../../images/profile.jpeg";
import Prof from "../../images/prof.jpg";
import MessageIcon from '@material-ui/icons/Message';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
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
import { useParams } from "react-router-dom";

import "./profile.css";

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
  const params = useParams();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(params);
    // getPostFromFirebase();
  }, []);

  useEffect(() => {
    getPostFromFirebase();
  }, [
    (params && params.uid !== undefined) ||
      (auth.currentUser && auth.currentUser.uid),
  ]);

  const getPostFromFirebase = async () => {
    setPosts([]);

    let uid;

    // console.log(props, auth.currentUser);
    if (params && params.uid !== undefined) {
      uid = params.uid;
    } else if (auth.currentUser && auth.currentUser.uid) {
      uid = auth.currentUser.uid;
    }

    if (uid && uid !== undefined) {
      const q = query(collection(db, "posts"), where("uid", "==", uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshotsi
        let obj = doc.data();
        obj.key = doc.id;
        console.log(doc.id, " => ", doc.data());
        console.log(obj);
        setPosts((earlierPosts) => [...earlierPosts, obj]);
      });
    }
  };

  return (
    <div className="containerr">
      <div className="profile-container">
        <img src={Cover} className="profile-img" />
        <div className="profile-details">
          <div className="pd-left">
            <div className="pd-row">
              <img src={Profile} className="mutual-friend" />

              <div>
                <h3>Unknown</h3>
                <p>123 friends - 40 mutual</p>
                <img src={Prof} className="prof"/>
                <img src={Prof} className="prof"/>
                <img src={Prof} className="prof"/>
                <img src={Prof} className="prof"/>

              </div>
            </div>
          </div>
          <div className="pd-right">
            <button className="addBtn" ><GroupAddIcon/> </button>
            <button className="addBtn"> < MessageIcon/></button>
          </div>
        </div>
      </div>

      {posts.map((val, ind) => {
        return (
          <div key={ind}>
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

                  <Typography></Typography>
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
