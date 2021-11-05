//import './App.css';
import {useState, useEffect} from 'react';
import PlayerContainer from './PlayerContainer';
import NewPlayerForm from './NewPlayerForm';

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
      <header className="header">
        <h1>My Team</h1>
        <br/>
        <br/>
        <img src={'https://faberinfinite.com/wp-content/uploads/2018/11/team-3393037_1920.jpg'} alt="team" height='80'  />
        <br/>
        <br/>
        <NewPlayerForm addNewPlayer={addNewPlayer}/>
      </header>
      
      <PlayerContainer players={players} />
    </div>
  );
}

export default App;


//run 'npm run seed' to copy data from the db/seeds.json file to the db/db.json file
//to run the server, run 'npm run dev'