import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import "./search-people.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SearchPeople = ({ getData, users, navigate, inputRef }) => {
  const classes = useStyles();

  return (
    <>
      {/* <input type="text" onChange={getData} /> */}

      <TextField
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
        onChange={getData}
        ref={inputRef}
      />
      <ul>
        {users &&
          users.map((val, ind) => (
            <li key={ind} onClick={() => navigate(`/profile/${val.uid}`)}>
              {val.username}
            </li>
          ))}
      </ul>
    </>
  );
};

export default SearchPeople;
