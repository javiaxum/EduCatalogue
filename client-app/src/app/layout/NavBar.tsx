import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button, Dropdown, Image, Menu, Search } from 'semantic-ui-react';
import LoginForm from '../../features/identity/LoginForm';
import RegisterForm from '../../features/identity/RegisterForm';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { modalStore, userStore, profileStore, commonStore, institutionStore } = useStore()
    const { t, i18n } = useTranslation();
    const location = useLocation();

    return (
        <Menu secondary inverted style={{ borderRadius: '0px', minWidth: location.pathname === '/institutions/comparison' || location.pathname === '/specialties/comparison' ? '100%' : '85rem' }}>
            <Menu.Item as={Link} to="/institutions" onClick={() => commonStore.setComparison(undefined)}>
                <img src='\assets\logo.png' alt='logo' style={{ width: "4em", height: "4em", alignSelf: "center" }} />
                <div style={{ fontSize: "22px", marginLeft: "10px" }}>EDUA</div>
            </Menu.Item>
            <Menu.Item>
                {location.pathname === '/institutions' &&
                    <Search
                        placeholder={t('Search institutions')! + '...'}
                        showNoResults={false}
                        onSearchChange={(e, d) => {
                            institutionStore.setSearchNameParam(d.value!);
                        }} />}
            </Menu.Item>
            {profileStore.isOperator && location.pathname === '/institutions' &&
                <Menu.Item>
                    <Button.Group>
                        <Button  active={userStore.showPendingChanges} onClick={() => userStore.toggleShowPendingChanges()}>
                            {t(userStore.showPendingChanges ? 'Hide pending changes' : 'Show pending changes')}
                        </Button>
                        {profileStore.isOperator &&
                            <Button  as={Link} to='createInstitution'>
                                {t('Create Institution')}
                            </Button>}
                    </Button.Group>
                </Menu.Item>}

            {/* <Menu.Item as={NavLink} to="/errors" name='Errors' /> */}
            {/* <Menu.Item position='right'>
                <Button.Group>
                    <Button
                        className='languageToggler'
                        style={{ border: '0', background: 'none', padding: '0.5rem' }}
                        active={i18n.language === 'en'}
                        onClick={() => { i18n.changeLanguage('en'); }}>
                        Eng
                    </Button>
                    <Button
                        className='languageToggler'
                        style={{ border: '0', background: 'none', padding: '0.5rem' }}
                        active={i18n.language === 'uk'}
                        onClick={() => { i18n.changeLanguage('uk'); }}>
                        Укр
                    </Button>
                </Button.Group>
            </Menu.Item> */}
            <Menu.Item name='Profile' position='right' >
                <Image src={profileStore.profile?.avatar?.url || '/assets/user.png'} avatar spaced='right' />
                <Dropdown pointing='top right' text={profileStore.profile?.displayName} >
                    <Dropdown.Menu>
                        {userStore.isLoggedIn ?
                            <>
                                <Dropdown.Item as={Link} to={`/profiles/${profileStore.profile?.username}`} text={t('My Profile')} icon='user' />
                                <Dropdown.Item onClick={userStore.logout} text={t('Logout')} icon='power' />
                            </> :
                            <>
                                <Dropdown.Item onClick={() => modalStore.openModalMini(<RegisterForm />)} position='right' text={t('Register')}></Dropdown.Item>
                                <Dropdown.Item onClick={() => modalStore.openModalMini(<LoginForm />)} position='right' text={t('Login')}></Dropdown.Item>
                            </>}
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Menu>
    )
})