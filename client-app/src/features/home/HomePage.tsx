import { observer } from 'mobx-react-lite';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../identity/LoginForm';
import RegisterForm from '../identity/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    return (
        <Grid style={{ width: '100vw', height: '100vh', margin: 0, alignContent: 'center' }} centered className='masthead' >
            <Header as='h1' inverted>
                <Image src='/assets/logo.png' alt='logo' verticalAlign="bottom" style={{ marginBottom: 5, width: '1.1em' }} />
                EduCatalogue
            </Header>
            {userStore.isLoggedIn
                ? (<Button as={Link} to={`/institutions`} content='To Institutions' />)
                : (<>
                    <Button size='big' style={{ width: '7em' }} inverted onClick={() => modalStore.openModalMini(<LoginForm />)} content='Login' />
                    <Button size='big' style={{ width: '7em' }} inverted onClick={() => modalStore.openModalMini(<RegisterForm />)} content='Register' />
                </>)}
        </Grid>
    )
})