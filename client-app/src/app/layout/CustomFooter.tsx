import { useTranslation } from 'react-i18next';
import { Button, Divider, Grid, List, Segment, Image } from 'semantic-ui-react';
import { router } from '../../features/routers/Routes';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function CustomFooter() {
    const { t } = useTranslation();
    return (
        <footer>
            <Grid style={{ color: '#444', top: 0, background: '#eee', margin: 0, minWidth: '85rem', padding: 0 }}>
                <Grid.Row>
                    <Link className='footer-link' to='/about' style={{ color: '#888', fontWeight: 600, padding: '0 2rem', display: 'inline-block' }}>{t('About us')}</Link>
                    <IconButton
                        href='https://github.com/javiaxum/EduCatalogue'
                        style={{ display: 'inline' }}>
                        <GitHubIcon />
                    </IconButton>
                    <IconButton
                        href='https://www.linkedin.com/in/illia-vasiutynskyi-00548523b'
                        style={{ display: 'inline' }}>
                        <LinkedInIcon />
                    </IconButton>
                </Grid.Row>
                <Divider style={{ width: '10rem' }} />
                <Grid.Row>
                    <Segment basic style={{ color: '#aaa', fontWeight: 600, padding: '1rem 5rem 2rem 5rem' }}>@EduCatalogue 2023</Segment>
                </Grid.Row>
            </Grid>
        </footer>
    )
}