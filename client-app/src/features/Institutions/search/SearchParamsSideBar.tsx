import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Button, Divider, Header, Segment } from 'semantic-ui-react';
import SearchParamsList from './SearchParamsList';
import { useStore } from '../../../app/stores/store';

export default function SearchParamsSideBar() {
    const { t } = useTranslation();
    const { institutionStore } = useStore();

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' })

    return (
        <>
            {isMobile &&
                <Segment style={{ boxShadow: 'none', border: 0, borderRadius: 0 }}>
                    <Divider />
                    <Header
                        as='h3'
                        content={t('Filtering Options')} />
                    <SearchParamsList />
                </Segment>}
            {isComputerOrTablet &&
                <Segment style={{ top: 0 }}>
                    <Header
                        as='h3'
                        content={t('Filtering Options')} />
                    <Button
                        icon='trash'
                        onClick={() => institutionStore.resetSearchParams()} basic style={{ position: 'absolute', right: 0, top: '0.3rem', boxShadow: 'none' }} />
                    <SearchParamsList />
                </Segment>}
        </>
    )
}