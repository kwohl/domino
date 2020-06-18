import React, { useState, useEffect } from "react";
import ListManager from "../../modules/ListManager";

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
      <div className="pageContent">
          <h3>Select a List to View</h3>
          <div>
            {lists.map(list => (
              <p key={list.id} onClick={() => props.history.push(`/list/${list.id}`)}>{list.name}</p>
            ))}
          </div>
      </div>
    );
  };
  
  export default List;