import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../identity/LoginForm';
import RegisterForm from '../identity/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore()
    return (
        <Segment inverted textAlign='center' vertical className='masthead' clearing>
            <Container text>
                <Header as='h1' inverted>
                    <Image src='/assets/logo.png' alt='logo' verticalAlign="bottom" style={{ marginBottom: 5, width: '1.1em'}} />
                    EduCatalogue
                </Header>

                {userStore.isLoggedIn
                    ? (<Button as={Link} to={`/institutions`} content='To Institutions' />)
                    : (<>
                        <Button size='big' style={{width: '7em'}} inverted onClick={() => modalStore.openModal(<LoginForm />)} content='Login' />
                        <Button size='big' style={{width: '7em'}} inverted onClick={() => modalStore.openModal(<RegisterForm />)} content='Register' />
                    </>)}

            </Container>
        </Segment>
    )
})