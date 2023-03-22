import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button, Checkbox, Container, Divider, Dropdown, Grid, Header, Icon, Image, Item, Menu, Search, Segment, Sidebar } from 'semantic-ui-react';
import LoginForm from '../../features/identity/LoginForm';
import { useStore } from '../stores/store';
import { CSSTransition } from 'react-transition-group';
import SearchParamsSideBar from '../../features/Institutions/search/SearchParamsSideBar';

export default observer(function NavBarMobile() {
    const { modalStore, userStore, profileStore, commonStore, institutionStore } = useStore()
    const { setSidebarOpened, sidebarOpened } = commonStore;
    const { t, i18n } = useTranslation();
    return (
        <>
            <Menu inverted style={{ borderRadius: '0px' }}>
                <Menu.Item>
                    <Button
                        style={{ border: 0, background: 'none' }}
                        onClick={() => setSidebarOpened(!sidebarOpened)}>
                        <Icon
                            inverted={!sidebarOpened}
                            name='sidebar'
                            size='big' />
                    </Button>
                </Menu.Item>
                <Menu.Item as={NavLink} to="/">
                    <img src='\assets\logo.png' alt='logo' style={{ width: "3rem", height: "3rem", alignSelf: "center" }} />
                    <div style={{ fontSize: "22px", marginLeft: "10px" }}>EduCatalogue</div>
                </Menu.Item>
            </Menu>
            <Menu inverted style={{ borderRadius: '0px', height: '3rem' }}>
                <Search
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    placeholder={t('Search institutions')! + '...'}
                    showNoResults={false}
                    onSearchChange={(e, d) => {
                        institutionStore.setSearchNameParam(d.value!);
                    }}
                />
            </Menu>
            <CSSTransition
                in={sidebarOpened}
                timeout={400}
                classNames="sidebar-transition"
                unmountOnExit
                appear>
                <Grid divided style={{ margin: 0, padding: 0, width: '19rem', height: '200vh', backgroundColor: 'rgb(30, 71, 160)', position: 'absolute', top: '7rem', zIndex: 1000 }}>
                    <Grid.Column textAlign='center' style={{ width: '19rem', padding: 0, marginLeft: '1rem' }}>
                        <Grid.Row style={{ padding: '1rem 0 1rem 0' }}>
                            <Button.Group style={{ padding: '1rem 0 1rem 0' }}>
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
                        </Grid.Row>
                        <Grid.Row style={{ padding: '1rem 0 1rem 0', backgroundColor: '#fff', borderRight: '1px solid rgba(34,36,38,.15)' }}>
                            <Segment style={{ border: 0, borderRadius: 0, boxShadow: 'none' }}>
                                {!userStore.isLoggedIn
                                    ? (<Button
                                        style={{ boxShadow: 'none' }}
                                        basic
                                        fluid
                                        content={t('Login')}
                                        onClick={() => modalStore.openModalMini(<LoginForm />)}
                                        position='right'
                                        name='Profile' />)
                                    : (<>
                                        <Image src={profileStore.profile?.avatar?.url || '/assets/user.png'} avatar spaced='right' />
                                        {userStore.user?.displayName}
                                        <Button
                                            basic
                                            fluid
                                            style={{ boxShadow: 'none' }}
                                            as={Link}
                                            to={`/profiles/${userStore.user?.username}`}
                                            content={t('My Profile')}
                                            icon='user' />
                                        <Button
                                            basic
                                            fluid
                                            style={{ boxShadow: 'none' }}
                                            onClick={() => userStore.logout()}
                                            content={t('Logout')}
                                            icon='power' />
                                    </>)}
                            </Segment>
                        </Grid.Row>
                        <Grid.Row>
                            <SearchParamsSideBar />
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </CSSTransition>
        </>
    )
})