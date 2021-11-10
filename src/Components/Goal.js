// import {useState, useEffect} from "react";
import styled from "styled-components";

function Goal( {goal, handleDelete} ) {
    return(
        <ListItem>
            <p>{goal.name}</p>
            <button onClick={() => handleDelete(goal.id)} style={{marginLeft: '15px'}}>Delete</button> 
        </ListItem>
        
    )
}

export default Goal;

const ListItem = styled.div`
  text-align: center;
  display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px;
`;