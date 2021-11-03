
function PlayerCard( {player} ) {

    return(
        <div className='card'>
            <h2>{player.name}</h2>
            <img src={player.image} alt={player.name} className='image' /> 
        </div>
    )
}

export default PlayerCard;