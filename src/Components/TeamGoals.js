import {useState, useEffect} from "react";
import styled from "styled-components";
import Goal from "./Goal";

function TeamGoals() {
    
    const [goals, setGoals] = useState([])
    const [newGoal, setNewGoal] = useState('')

    useEffect(() => {
        fetch(`https://tranquil-cliffs-49188.herokuapp.com/goals`)
        .then(r => r.json())
        .then(data => {
            setGoals(data)
        })
    }, [])

    function handleChange(e) {
        setNewGoal(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`https://tranquil-cliffs-49188.herokuapp.com/goals`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: newGoal})
        })
        .then(r => r.json())
        .then(data => {
            setGoals([...goals, data])
            setNewGoal('')
        })
    }

    function handleDelete(goalID) {
        const updatedGoals = goals.filter(goal => goal.id !== goalID)
        fetch(`https://tranquil-cliffs-49188.herokuapp.com/goals/${goalID}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(setGoals(updatedGoals))
    }

    return (
        <Goals>
            <h1>Team Goals</h1>     
            {goals.map(goal => {
                return <Goal key={goal.id} goal={goal} handleDelete={handleDelete}/>
            })} 
            <form onSubmit={handleSubmit} style={{padding: '30px'}}>
                <label htmlFor="goal"> New Goal: </label>
                <input type="text" id="goal" name="goal" value={newGoal} onChange={handleChange} style={{marginRight: '10px'}} />
                <input type="submit" value="Add Goal"></input>
            </form>
            <img src='https://random-d.uk/api/126.jpg' alt='duck quote' height='400' style={{marginBottom: '20px', padding: '30px'}}></img>
        </Goals>   
    )
}

export default TeamGoals;

const Goals = styled.div`
  text-align: center;
  padding: 20px;
`;
