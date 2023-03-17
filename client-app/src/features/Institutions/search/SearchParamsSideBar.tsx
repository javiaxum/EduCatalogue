import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Grid, Header, Segment } from 'semantic-ui-react';
import SearchParamsList from './SearchParamsList';

export default function SearchParamsSideBar() {
    const { t, i18n } = useTranslation();
    return (
        <Grid style={{ padding: 0, margin: 0 }}>
            <Grid.Row only='mobile' style={{ padding: 0, margin: 0 }}>
                <Segment style={{ boxShadow: 'none', border: 0, borderRadius: 0 }}>
                    <Divider />
                    <Header as='h3' content={t('Filtering Options')} />
                    <SearchParamsList />
                </Segment>
            </Grid.Row>
            <Grid.Row only='computer tablet' style={{ padding: 0, margin: 0 }}>
                <Segment>
                    <Header as='h3' content={t('Filtering Options')} />
                    <SearchParamsList />
                </Segment>
            </Grid.Row>
        </Grid>

    )
}