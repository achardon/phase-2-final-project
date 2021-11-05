import {useState, useEffect} from 'react';
import PlayerContainer from './PlayerContainer';
import NewPlayerForm from './NewPlayerForm';
import Header from './Header';

function App() {

  const [players, setPlayers] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/players')
    .then(r => r.json())
    .then(data => {
      setPlayers(data)
    })
  }, [])

  //console.log(players)

  function addNewPlayer(newPlayer) {
    console.log(newPlayer)
    fetch(`http://localhost:3000/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: newPlayer})
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
      setPlayers([...players, data])
    })
  }

  return (
    <div className="App">
      <Header />
      <NewPlayerForm addNewPlayer={addNewPlayer}/>
      
      
      <PlayerContainer players={players} />
    </div>
  );
}

export default App;


//run 'npm run seed' to copy data from the db/seeds.json file to the db/db.json file
//to run the server, run 'npm run dev'