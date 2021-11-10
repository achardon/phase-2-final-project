import {useState, useEffect} from "react";
import styled from "styled-components";
import Goal from "./Goal";

function TeamGoals() {
    
    const [goals, setGoals] = useState([])
    const [newGoal, setNewGoal] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3000/goals`)
        .then(r => r.json())
        .then(data => {
            setGoals(data)
        })
    }, [])

    function handleChange(e) {
        setNewGoal(e.target.value)
    }

    //How do you clear form after submitting?
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3000/goals`, {
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
        fetch(`http://localhost:3000/goals/${goalID}`, {
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
            <br/>
            {/* <img src='https://dq5pwpg1q8ru0.cloudfront.net/2020/10/30/09/11/52/a3aff958-3697-47cf-8aec-9c7227a6e3ed/duck-flying-wallpaper-background-17254-17792-hd-wallpapers.jpg' alt='duck quote' height='400'></img> */}
            <img src='https://random-d.uk/api/126.jpg' alt='duck quote' height='400' style={{marginBottom: '20px'}}></img>
        </Goals>
        
    )
}

export default TeamGoals;

const Goals = styled.div`
  text-align: center;
`;
