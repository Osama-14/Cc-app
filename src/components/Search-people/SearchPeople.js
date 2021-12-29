import React from 'react';
import TextField from '@material-ui/core/TextField';
import "./search-people.css";

const SearchPeople = ({ getData }) => {
  return (

    <div>
      <TextField
      style={{color:"black"}}
          id="standard-textarea"
          label="Search"
          placeholder="Placeholder"
          onChange={getData}
          multiline
        />
        {/* {getData.filter((item) =>  {
                    if(getData === ""){
                        return item;
                    }
                    else if(item.name.toLowerCase()
                            .includes(getData.toLowerCase())){
                        return item
                    }

                }).map((item) => (
                    <div key={item.id}><p className="items"> 
                      {item.name}
                    </p></div>
                ))} */}
                

    </div>
  );
};

export default SearchPeople;
