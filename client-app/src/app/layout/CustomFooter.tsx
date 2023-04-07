import { useTranslation } from 'react-i18next';
import { Grid, List } from 'semantic-ui-react';

export default function CustomFooter() {
    const { t } = useTranslation();
    return (
        <footer>
            <Grid style={{ color: '#444', top: 0, background: '#eee', margin: 0, height: '24rem', minWidth: '85rem', padding: 0 }}>
                <Grid.Row>
                    <Grid.Column style={{ width: '15rem' }}>
                        <List link >
                            <List.Item as='a'>{t('About us')}</List.Item>
                            <List.Item as='a'>{t('Contact us')}</List.Item>
                            <List.Item as='a'>{t('FAQ')}</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <p>@EduCatalogue 2023</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </footer>
    )
}