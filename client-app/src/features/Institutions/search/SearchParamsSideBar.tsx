import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Divider, Header, Segment } from 'semantic-ui-react';
import SearchParamsList from './SearchParamsList';

export default function SearchParamsSideBar() {
    const { t } = useTranslation();

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' })

    return (
        <>
            {isMobile &&
                <Segment style={{ boxShadow: 'none', border: 0, borderRadius: 0 }}>
                    <Divider />
                    <Header as='h3' content={t('Filtering Options')} />
                    <SearchParamsList />
                </Segment>}
            {isComputerOrTablet &&
                <Segment style={{ top: 0, maxHeight: '40rem'}}>
                    <Header as='h3' content={t('Filtering Options')} />
                    <SearchParamsList />
                </Segment>}
        </>
    )
}