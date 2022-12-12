import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Header, Item, Menu, Search } from 'semantic-ui-react';

export default function NavBar() {
    return (
        <Menu inverted>
            <Container>
                <Menu.Item as={NavLink} to="/">
                    <img src='\assets\logo.png' alt='logo' style={{ width: "4em", height: "4em", alignSelf: "center" }} />
                    <div style={{ fontSize: "22px", marginLeft: "10px" }}>EduCatalogue</div>
                </Menu.Item>
                <Menu.Item as={NavLink} to="/Institutions" name='Institutions' />
                <Menu.Item as={NavLink} to="/errors" name='Errors' />
                <Menu.Item name='Educational Programs'></Menu.Item>
            </Container>
        </Menu>
    )
}