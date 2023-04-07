import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Image } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../identity/LoginForm';
import RegisterForm from '../identity/RegisterForm';
import { useTranslation } from 'react-i18next';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    const { t } = useTranslation();

    return (
        <Grid style={{ width: '100vw', height: '100vh', margin: 0, alignContent: 'center' }} centered className='masthead' >
            <Grid.Row>
                <Header as='h1' inverted>
                    <Image src='/assets/logo.png' alt='logo' verticalAlign="bottom" style={{ marginBottom: 5, width: '1.1em' }} />
                    EduCatalogue
                </Header>
            </Grid.Row>
            <Grid.Row style={{ padding: 0 }}>
                {userStore.isLoggedIn ?
                    <Button size='big' inverted as={Link} to={`/institutions`} content={t('To Institutions Search')} style={{ height: 'fit-content' }} /> :
                    <>
                        <Button size='big' style={{ width: '15rem' }} inverted onClick={() => modalStore.openModalMini(<LoginForm />)} content={t('Login')} />
                        <Button size='big' style={{ width: '15rem' }} inverted onClick={() => modalStore.openModalMini(<RegisterForm />)} content={t('Register')} />
                    </>}
            </Grid.Row>
        </Grid>
    )
})