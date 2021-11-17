import { useState, useEffect } from "react";
import styled from "styled-components";

function PlayerCard({ player, handleDelete }) {
  const [duck, setDuck] = useState("");
  const [fact, setFact] = useState("");
  const [news, setNews] = useState({ title: "", content: "" });
  const [details, setDetails] = useState(false)

  useEffect(() => {
    //created proxy server using this blog: https://dev.to/imiebogodson/fixing-the-cors-error-by-hosting-your-own-proxy-on-heroku-3lcb
    fetch("https://hidden-eyrie-69734.herokuapp.com/https://random-d.uk/api/v1/random")
      .then((r) => r.json())
      .then((data) => {
        const image = data.url;
        setDuck(image);
      });
  }, []);

  useEffect(() => {
    // fetch("https://uselessfacts.jsph.pl/random.json")
    //if you only want facts in English
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
      .then((r) => r.json())
      .then((data) => {
        //console.log(data)
        const fact = data.text;
        setFact(fact);
      });
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
  }, []);

  function handleDetails() {
      setDetails(!details)
  }

  // use below for if/else statements instead of AND && operator
  // function buttonText () {
  //   if (details) {
  //     return 'Hide Details';
  //   }
  //   else {
  //     return 'Show details about this player';
  //   }
  // }

  // function hobbies () {
  //   if (details) {
  //     return <p>Hobbies: {player.hobbies}</p>;
  //   }
  //   else {
  //     return null;
  //   }
  // }

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
        <Container>
          <button onClick={handleDetails}>{details? 'Hide Details':'Show details about this player'}</button>
        </Container>
          {details && <p>Hobbies: {player.hobbies}</p>}
        <Container>
          <button onClick={() => handleDelete(player.id)} >Delete Player</button>
        </Container>
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

const Container = styled.div`
  padding: 10px;
`;