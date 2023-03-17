import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu, Search } from 'semantic-ui-react';
import LoginForm from '../../features/identity/LoginForm';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { modalStore, userStore, profileStore, commonStore, institutionStore } = useStore()
    const { t, i18n } = useTranslation();
    return (
        <Menu inverted style={{ borderRadius: '0px'}}>
            <Menu.Item as={NavLink} to="/">
                <img src='\assets\logo.png' alt='logo' style={{ width: "4em", height: "4em", alignSelf: "center" }} />
                <div style={{ fontSize: "22px", marginLeft: "10px" }}>EduCatalogue</div>
            </Menu.Item>
            <Menu.Item as={NavLink} to="/institutions" name={t('Institutions').toString()} />
            {/* <Menu.Item as={NavLink} to="/errors" name='Errors' /> */}
            <Menu.Item>
                <Search
                    placeholder={t('Search institutions')! + '...'}
                    showNoResults={false}
                    onSearchChange={(e, d) => {
                        institutionStore.setSearchNameParam(d.value!);
                    }}
                />
            </Menu.Item>
            <Menu.Item position='right' style={{ marginRight: '0', position: 'relative' }}>
                <Button.Group>
                    <Button
                        className='languageToggler'
                        style={{ border: '0', background: 'none', padding: '0.5rem' }}
                        active={i18n.language == 'en'}
                        onClick={() => { i18n.changeLanguage('en'); }}>
                        Eng
                    </Button>
                    <Button
                        className='languageToggler'
                        style={{ border: '0', background: 'none', padding: '0.5rem' }}
                        active={i18n.language == 'ua'}
                        onClick={() => { i18n.changeLanguage('ua'); }}>
                        Укр
                    </Button>
                </Button.Group>
            </Menu.Item>
            {!userStore.isLoggedIn
                ? (<Menu.Item onClick={() => modalStore.openModal(<LoginForm />)} position='right' name='Profile'></Menu.Item>)
                : (<Menu.Item position='right' name='Profile'>
                    <Image src={profileStore.profile?.avatar?.url || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={userStore.user?.displayName} >
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${userStore.user?.username}`} text={t('My Profile')} icon='user' />
                            <Dropdown.Item onClick={userStore.logout} text={t('Logout')} icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>)}
        </Menu>
    )
})