import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import PlayerContainer from "./PlayerContainer";
import NewPlayerForm from "./NewPlayerForm";
import Header from "./Header";
import NavBar from "./NavBar";
import TeamGoals from "./TeamGoals";

function App() {
  const [players, setPlayers] = useState([]);
  const history = useHistory();
  

  useEffect(() => {
    fetch("http://localhost:3000/players")
      .then((r) => r.json())
      .then((data) => {
        setPlayers(data);
      });
  }, []);

  //console.log(players)

  function addNewPlayer(newPlayer) {
    // console.log(newPlayer);
    fetch(`http://localhost:3000/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data)
        setPlayers([...players, data]);
        history.push('/players')
      });
  }

  function handleDelete(playerID) {
    fetch(`http://localhost:3000/players/${playerID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      const updatedPlayers = players.filter((player) => player.id !== playerID);
      setPlayers(updatedPlayers);
    });
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Header />
        </Route>
        <Route exact path="/players/new">
          <NewPlayerForm addNewPlayer={addNewPlayer} />
        </Route>
        <Route exact path="/players">
          <PlayerContainer players={players} handleDelete={handleDelete} />
        </Route>
        <Route exact path="/goals">
          <TeamGoals />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

//run 'npm run seed' to copy data from the db/seeds.json file to the db/db.json file
//to run the server, run 'npm run dev'

//What is ReactStrictMode (which is what was automatically set up in index.js)?

//how do you run a clean up code for a fetch call in a useEffect?

//Why is it that when I first start the app with npm start that it goes to the /players page instead of the home page? Is this part of the "can't perform a react state update on unmounted component" error?

//How do you reset a form after submitting? In vanilla JS, it was form.reset(), but that doesn't work here... (Need to do this in TeamGoals component)

//In my TeamGoals component, how do I get the delete button next to the list item?

//How do you create space in JSX between different elements (besides using <br/>?

//protocol behind using images on app?





//Notes: command shift P to get to settings, that's where you will find auto save and automatic formatting after saving (for which I needed to install the plugin 'Prettier')

//Notes: to get the version you want for something (after downloading the wrong version accidentally, such as react-router-dom v6.0.0), you have to delete the 'package-lock.json' and the 'node_modules'. In 'package.json', find what you want a different version of, and type in the specific version you want(without the carrot in front of the version, because that would mean that version or higher). Then run 'npm install' and it should download the version you specified and restore 'package-lock.json' and 'node_modules'.

//Questions as of Friday 11/5: When I import {Switch}, it does not work, error says: 'Attempted import error: 'Switch' is not exported from 'react-router-dom'.' I found somewhere that in Version 6 of react-router-dom it should be 'Routes' instead of 'Switch'. When I put that in, I get another error saying 'react_devtools_backend.js:2528 Matched leaf route at location "/" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.' What is going on? Wrong version! The newest version (6.0.0) no longer uses 'Switch'. Solution for now is to manually install version 5.3.3.

//opening json in specific port: 'json-server --watch --port 4000 db.json' does not work (that's what we were doing in lecture) - what am I missing?

//when creating react-app, some sources said to use 'npx' instead of 'npm'. What's the difference? 'npx' is now preferred, but either works.