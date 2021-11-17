import PlayerCard from "./PlayerCard";
import styled from "styled-components";
import {useState} from 'react';

function PlayerContainer({ players, handleDelete }) {
  
  const [search, setSearch] = useState('')
  
  function handleChange(e) {
    setSearch(e.target.value)
  }

  const filterPlayers = players.filter(player => player.name.includes(search))

  return (
    <Container>
      <h1>My Team</h1>
      <label htmlFor='search'>Search Players:  </label>
      <input type='text' id='search' value={search} onChange={handleChange}/>
      <br/>

      {filterPlayers.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          handleDelete={handleDelete}
        />
      ))}
    </Container>
  );
}

export default PlayerContainer;

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;
