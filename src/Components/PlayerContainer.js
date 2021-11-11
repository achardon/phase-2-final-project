import PlayerCard from "./PlayerCard";
import styled from "styled-components";

function PlayerContainer({ players, handleDelete }) {
  return (
    <Container>
      <h1>My Team</h1>
      {players.map((player) => (
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
