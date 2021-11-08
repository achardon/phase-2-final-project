import {useState, useEffect} from 'react';
import styled from 'styled-components';

function PlayerCard( {player, handleDelete} ) {

    const [duck, setDuck] = useState('')
    const [fact, setFact] = useState('')
    const [news, setNews] = useState({title: '', content: ''})

    useEffect(() => {
        //fetch(`https://random-d.uk/api/v1/random`)
        //fetch(`https://placebear.com/g/200/300`)
        //fetch(`https://api.github.com/users/octocat`)
        //fetch(`https://randomfox.ca/floof/`)
        fetch("https://agile-beyond-71249.herokuapp.com/https://random-d.uk/api/v1/random")
        .then(r => r.json())
        .then(data => {
            //console.log(data)
            const image = data.url
            setDuck(image)
        })
    }, [])

    useEffect(() => {
        fetch('https://uselessfacts.jsph.pl/random.json')
        .then(r => r.json())
        .then(data => {
            //console.log(data)
            const fact = data.text
            setFact(fact)
        })
    }, [])

    useEffect(() => {
        fetch(`https://inshortsapi.vercel.app/news?category=science`)
        .then(r => r.json())
        .then(data => {
            //console.log(data)
            const number = Math.floor(Math.random() * 10)
            //console.log(number)
            const title = data.data[number].title
            const content = data.data[number].content
            setNews({title: title, content: content})
        })
    }, [])

    //console.log(duck)
    //console.log(news)

    return(
        <Card>
            <h2>{player.name}</h2>
            <img src={duck} alt={player.name} className='image' />
            <div>
                <h3>Random Fact: </h3> 
                <p>{fact}</p>
            </div>
            <div>
                <h3>Random News Article:</h3>
                <h4>{news.title}</h4>
                <p>{news.content}</p>
                <button onClick={() => handleDelete(player.id)}>Delete</button>
            </div>
           
        </Card>
    )
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
`