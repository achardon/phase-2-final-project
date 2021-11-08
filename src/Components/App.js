import {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import PlayerContainer from './PlayerContainer';
import NewPlayerForm from './NewPlayerForm';
import Header from './Header';
import NavBar from './NavBar';

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
    // console.log(newPlayer)
    fetch(`http://localhost:3000/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: newPlayer})
    })
    .then(r => r.json())
    .then(data => {
      // console.log(data)
      setPlayers([...players, data])
    })
  }

  function handleDelete(playerID) {
    fetch(`http://localhost:3000/players/${playerID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      const updatedPlayers = players.filter(player => player.id !== playerID)
      setPlayers(updatedPlayers)
    })
  }

  return (
    <div className="App">
      {/* <Switch> */}
        {/* <Route path="/"> */}
          <Header />
          <NavBar />
        {/* </Route> */}
        {/* <Route path='/players/new'> */}
          <NewPlayerForm addNewPlayer={addNewPlayer}/>
        {/* </Route> */}
        {/* <Route path='/players'> */}
          <PlayerContainer players={players} handleDelete={handleDelete}/>
        {/* </Route> */}
      {/* </Switch> */}
    </div>
  );
}

export default App;


//run 'npm run seed' to copy data from the db/seeds.json file to the db/db.json file
//to run the server, run 'npm run dev'

//Questions as of Friday 11/5: When I import {Switch}, it does not work, error says: 'Attempted import error: 'Switch' is not exported from 'react-router-dom'.' I found somewhere that in Version 6 of react-router-dom it should be 'Routes' instead of 'Switch'. When I put that in, I get another error saying 'react_devtools_backend.js:2528 Matched leaf route at location "/" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.' What is going on?

//opening json in specific port: 'json-server --watch --port 4000 db.json' does not work (that's what we were doing in lecture) - what am I missing?

//General questions: what other functionality could I add here? How to make it practical?
//What is ReactStrictMode (which is what was automatically set up in index.js)?