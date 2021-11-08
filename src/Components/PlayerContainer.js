import PlayerCard  from "./PlayerCard";

function PlayerContainer( {players, handleDelete} ) {
    
    return (
        <div>
            {players.map(player => <PlayerCard key={player.id} player={player} handleDelete={handleDelete} />)}
        </div>
    )
}

export default PlayerContainer;
