import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Header, Menu } from 'semantic-ui-react';

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to="/">
                    <img src='\assets\logo.png' alt='logo' style={{ width: "60px", height: "60px", alignSelf: "center" }} />
                </Menu.Item>
                <Menu.Item header style={{ fontSize: "20px" }}>EduCatalogue</Menu.Item>
                <Menu.Item as={NavLink} to="/Institutions" name='Institutions' />
                <Menu.Item name='Search Educational Program' />
            </Container>
        </Menu>
    )
}