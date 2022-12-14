import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import LoginForm from '../../features/identity/LoginForm';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { modalStore, userStore } = useStore()
    return (
        <Menu inverted style={{ borderRadius: '0px' }}>
            <Container>
                <Menu.Item as={NavLink} to="/">
                    <img src='\assets\logo.png' alt='logo' style={{ width: "4em", height: "4em", alignSelf: "center" }} />
                    <div style={{ fontSize: "22px", marginLeft: "10px" }}>EduCatalogue</div>
                </Menu.Item>
                <Menu.Item as={NavLink} to="/institutions" name='Institutions' />
                <Menu.Item as={NavLink} to="/errors" name='Errors' />
                <Menu.Item name='Educational Programs'></Menu.Item>
                {!userStore.isLoggedIn
                    ? (<Menu.Item onClick={() => modalStore.openModal(<LoginForm />)} position='right' name='Profile'></Menu.Item>)
                    : (<Menu.Item position='right' name='Profile'>
                        <Image src={userStore.user?.image || '/assets/user.png'} avatar spaced='right' />
                        <Dropdown pointing='top left' text={userStore.user?.displayName} >
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profile/${userStore.user?.username}`} text='My profile' icon='user' />
                                <Dropdown.Item onClick={userStore.logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>)}

            </Container>
        </Menu>
    )
})