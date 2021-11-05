import {useState} from 'react';

function NewPlayerForm( {addNewPlayer} ) {

    const [newPlayer, setNewPlayer] = useState('')

    function handleChange(e) {
        setNewPlayer(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        addNewPlayer(newPlayer)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={newPlayer} onChange={handleChange}/>
                <input type="submit" value="Add Player"></input>
            </form>
        </div>
    )
    
}

export default NewPlayerForm;