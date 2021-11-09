import { useState, useEffect } from "react";
import styled from "styled-components";

function PlayerCard({ player, handleDelete }) {
  const [duck, setDuck] = useState("");
  const [fact, setFact] = useState("");
  const [news, setNews] = useState({ title: "", content: "" });
  const [details, setDetails] = useState(false)

  useEffect(() => {
    //Michael's proxy server below
    // fetch("https://agile-beyond-71249.herokuapp.com/https://random-d.uk/api/v1/random")
    //created my own proxy server using this blog: https://dev.to/imiebogodson/fixing-the-cors-error-by-hosting-your-own-proxy-on-heroku-3lcb
    fetch("https://hidden-eyrie-69734.herokuapp.com/https://random-d.uk/api/v1/random")
      .then((r) => r.json())
      .then((data) => {
        //console.log(data)
        const image = data.url;
        setDuck(image);
      });
    //clean up function
    return function cleanup() {
      clearInterval(fetch);
    };
  }, []);

  useEffect(() => {
    fetch("https://uselessfacts.jsph.pl/random.json")
      .then((r) => r.json())
      .then((data) => {
        //console.log(data)
        const fact = data.text;
        setFact(fact);
      });
    //clean up function
    return function cleanup() {
        clearInterval(fetch);
      };
  }, []);

  useEffect(() => {
    //API: https://github.com/cyberboysumanjay/Inshorts-News-API  
    //for only science articles:
    fetch(`https://inshortsapi.vercel.app/news?category=science`)
    //for article of any genre:
    // fetch(`https://inshortsapi.vercel.app/news?category=all`)
      .then((r) => r.json())
      .then((data) => {
        //console.log(data)
        const number = Math.floor(Math.random() * 10);
        //console.log(number)
        const title = data.data[number].title;
        const content = data.data[number].content;
        setNews({ title: title, content: content });
      });
    //clean up function
    return function cleanup() {
        clearInterval(fetch);
      };
  }, []);

  function handleDetails() {
      setDetails(!details)
  }

  return (
    <Card>
      <h2>{player.name}</h2>
      <img src={duck} alt={player.name} className="image" />
      <div>
        <h3>{player.name}'s Fact: </h3>
        <p>{fact}</p>
      </div>
      <div>
        <h3>{player.name}'s News Article:</h3>
        <h4>{news.title}</h4>
        <p>{news.content}</p>
        <button onClick={handleDetails}>{details?'Hide Details':'Show details about this player'}</button>
        {details?<p>Hobbies: {player.hobbies}</p>:null}
        <br/>
        <br/>
        <button onClick={() => handleDelete(player.id)} >Delete Player</button>
      </div>
    </Card>
  );
}

export default PlayerCard;

const Card = styled.div`
  text-align: center;
  border: rgb(115, 37, 164) solid 5px;
  padding: 1rem;
  width: 400px;
  height: 800px;
  display: inline-grid;
  margin: 25px;
  box-shadow: 3px 4px #e04b52;
  img {
    height: 150px;
    justify-self: center;
  }
`;
