import {useState, useEffect} from 'react';

function PlayerCard( {player} ) {

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
        <div className='card'>
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
            </div>
           
        </div>
    )
}

export default PlayerCard;