import PlayerCard  from "./PlayerCard";

function PlayerContainer( {players} ) {
    
    return (
        <div>
            {players.map(player => <PlayerCard key={player.id} player={player} />)}
        </div>
    )
}

export default PlayerContainer;
