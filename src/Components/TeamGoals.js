import {useState, useEffect} from "react";
import styled from "styled-components";
import Goal from "./Goal";

function TeamGoals() {
    
    const [goals, setGoals] = useState([])
    const [newGoal, setNewGoal] = useState({
        name: ''
    })

    useEffect(() => {
        fetch(`http://localhost:3000/goals`)
        .then(r => r.json())
        .then(data => {
            setGoals(data)
        })
    }, [])

    function handleChange(e) {
        setNewGoal({name: e.target.value})
    }

    //How do you clear form after submitting?
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3000/goals`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGoal)
        })
        .then(r => r.json())
        .then(data => {
            setGoals([...goals, data])
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
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="goal"> New Goal: </label>
                <input type="text" id="goal" name="goal" value={newGoal.name} onChange={handleChange} />
                <input type="submit" value="Add Goal"></input>
            </form>
        </Goals>
        
    )
}

export default TeamGoals;

const Goals = styled.div`
  text-align: center;
`;
