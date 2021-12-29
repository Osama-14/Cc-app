import React from "react";
import "./search-people.css";

const SearchPeople = ({ getData }) => {
  return (
    <>
      <input type="text" onChange={getData} />
    </>
  );
};

export default SearchPeople;
