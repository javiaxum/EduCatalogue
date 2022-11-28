import React from 'react';
import { Container, Header, Menu } from 'semantic-ui-react';

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <img src='\assets\logo.png' alt='logo' style={{width: "60px", height: "60px", alignSelf: "center"}}/>
                <Menu.Item header style={{fontSize: "20px"}}>EduCatalogue</Menu.Item>
                <Menu.Item name='Institutions' active/>
                <Menu.Item name='Search Educational Program' />
            </Container>
        </Menu>
    )
}