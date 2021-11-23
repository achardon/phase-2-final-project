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

  function addNewPlayer(newPlayer) {
    fetch(`https://tranquil-cliffs-49188.herokuapp.com/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    })
      .then((r) => r.json())
      .then((data) => {
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

//Notes: command shift P to get to settings, that's where you will find auto save and automatic formatting after saving (for which I needed to install the plugin 'Prettier')

//Notes: to get the version you want for something (after downloading the wrong version accidentally, such as react-router-dom v6.0.0), you have to delete the 'package-lock.json' and the 'node_modules'. In 'package.json', find what you want a different version of, and type in the specific version you want(without the carrot in front of the version, because that would mean that version or higher). Then run 'npm install' and it should download the version you specified and restore 'package-lock.json' and 'node_modules'.

//when creating react-app, some sources said to use 'npx' instead of 'npm'. What's the difference? 'npx' is now preferred, but either works.

//deploying:
//https://dev.to/caicindy87/deploying-rails-api-backend-react-frontend-app-to-heroku-5a25#deploy-react
//skip steps 4-6
//go to heroku, tab that says 'deploy'
//change 'heroku git' to 'github' for Deployment method
