import styled from "styled-components";
import { NavLink } from 'react-router-dom';

const linkStyles = {
    display: 'inline-block',
    padding: 15,
};

function NavBar() {

    return(
        <Bar>
            <NavLink to='/' exact style={linkStyles} >Home</NavLink>
            <NavLink to='/players' exact style={linkStyles} >My Team</NavLink>
            <NavLink to='/players/new' exact style={linkStyles} >Add Player</NavLink>
        </Bar>
    )
}

export default NavBar;

const Bar = styled.div`
    text-align: center;
    padding: 20px;
`