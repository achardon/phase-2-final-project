import {useState} from 'react';
import styled from 'styled-components';

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
        <Form>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">  Name:    </label>
                <input type="text" id="name" name="name" value={newPlayer} onChange={handleChange}/>
                <input type="submit" value="Add Player"></input>
            </form>
        </Form>
    )
    
}

export default NewPlayerForm;

const Form = styled.div`
    margin: auto;
    box-shadow: 4px 4px 8px 10px rgba(0,0,0,0.3);
    width: 320px;
    input {
        padding: 5px;
        margin: 5px;
    }
    label {
        margin-left: 10px;
    }
`