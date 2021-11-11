import styled from "styled-components";

function Header() {
    return(
        <HeaderBar >
            <h1>Welcome!</h1>
            <img src={'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-mallard-duck-family-jan-holden.jpg'} alt="team" height='800'  />
        </HeaderBar>
    )
}

export default Header;

const HeaderBar = styled.div`
    text-align: center;
    padding: 20px;
`