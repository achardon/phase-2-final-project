import {useState} from 'react';
import styled from 'styled-components';

function NewPlayerForm( {addNewPlayer} ) {

    const [newPlayer, setNewPlayer] = useState({
        name: '',
        hobbies: ''
    })

    function handleChange(e) {
        setNewPlayer({...newPlayer,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        addNewPlayer(newPlayer)
        //how do I clear form here? 
    }

    return(
        <div>
            <br/>
            <h2 style={{textAlign: 'center'}}>Add New Player</h2>
            <Form>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">  Name:    </label>
                    <input type="text" id="name" name="name" value={newPlayer.name} onChange={handleChange}/>
                    <label htmlFor="hobbies">  Favorite Hobbies:    </label>
                    <input type="text" id="hobbies" name="hobbies" value={newPlayer.hobbies} onChange={handleChange}/>
                    <input type="submit" value="Add Player"></input>
                </form>
            </Form>
        </div>
        
    )
    
}

export default NewPlayerForm;

const Form = styled.div`
    margin: auto;
    box-shadow: 4px 4px 8px 10px rgba(0,0,0,0.3);
    width: 650px;
    input {
        padding: 5px;
        margin: 5px;
    }
    label {
        margin-left: 10px;
    }
    margin-top: 50px;
    display: flex;
`