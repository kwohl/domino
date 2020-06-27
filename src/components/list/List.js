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
              <Link key={list.id} onClick={() => props.history.push(`/list/${list.id}`)}>{list.name}</Link>
            ))}
          </div>
      </div>
    );
  };
  
  export default List;