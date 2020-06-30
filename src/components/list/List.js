import React, { useState, useEffect } from "react";
import ListManager from "../../modules/ListManager";
import { Link } from "react-router-dom";

const List = (props) => {
    const [lists, setLists] = useState([])


    const getLists = () => {
      ListManager.getAllLists()
        .then(response => {
          setLists(response);
        })
    };

    useEffect(() => {
      getLists()
    }, [])
    
    return (
      <div>
          <div>
            {lists.map(list => (
              <a 
                key={list.id} 
                onClick={() => props.history.push(`/list/${list.id}`)}
                className="top-margin"
              >  
                <h4>{list.name}</h4>
              </a>
            ))}
          </div>
      </div>
    );
  };
  
  export default List;