// import {useState, useEffect} from "react";
import styled from "styled-components";

function Goal( {goal, handleDelete} ) {
    return(
        <ListItem>
            <p>{goal.name}</p>
            <button onClick={() => handleDelete(goal.id)}>Delete</button>
            <br/>
            <br/>
            
        </ListItem>
        
    )
}

export default Goal;

const ListItem = styled.div`
  text-align: center;
`;