import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Segment } from 'semantic-ui-react';
import SpecialtyCoreSearchParamsList from './SearchParamsList';

export default function SearchParamsSideBar() {
    const { t, i18n } = useTranslation();
    return (
        <Segment>
            <Header as='h3' content={t('Filtering Options')} />
            <SpecialtyCoreSearchParamsList />
        </Segment>
    )
}