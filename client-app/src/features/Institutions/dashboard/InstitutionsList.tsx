import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Divider, Grid, Header, List, Loader, Segment, Select, Transition } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import InstitutionsListItem from './InstitutionsListItem';
import InstitutionsListItemPlaceholder from './InstitutionsListItemPlaceholder';

export default observer(function InstitutionsList() {
    const { institutionStore } = useStore();
    const {
        institutionPagination: pagination,
        institutionPagingParams: pagingParams,
        setInstitutionsSearchSort,
        setLoading,
        institutionsSorting: selectedInstitutionsSort,
        loading,
        loadingInitial,
        institutions } = institutionStore;

    let placeholders = [];
    for (let i = 0; i < pagingParams.pageSize; i++) {
        placeholders.push(<InstitutionsListItemPlaceholder key={i} />);
    }
    const { t } = useTranslation();

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' })

    return (
        <>
            {isComputerOrTablet &&
                <>
                    <Header as='h2' content={t("Institutions search")} style={{ width: '100%' }} />
                    <Header
                        as='h5'
                        color='grey'
                        style={{ margin: 0 }} >
                        {t('search results') + ": "}
                        {loading ? <Loader active inline size='mini' /> : pagination?.totalItems}
                    </Header>
                    <Segment basic style={{ width: '100%', border: 0, padding: 0 }}>
                        <Divider style={{ width: 'calc(100% - 14rem)', display: 'inline-block' }} />
                        <Select
                            style={{ display: 'inline-block' }}
                            options={t("institutionSortingOptions", { returnObjects: true })}
                            value={selectedInstitutionsSort}
                            onChange={(e, d) => setInstitutionsSearchSort(d.value as string)} />
                    </Segment>
                </>
            }
            {isMobile &&
                <>
                    <Grid style={{ margin: 0, padding: '1rem' }}>
                        <Grid.Row style={{ margin: 0, padding: 0 }}>
                            <Header as='h2' content={t("Institutions")} style={{ width: '100%' }} />
                        </Grid.Row>
                        <Grid.Row style={{ margin: 0, padding: 0 }}>
                            <Header
                                as='h5'
                                color='grey'
                                style={{ margin: 0 }} >
                                {t('search results') + ": "} {loading ? <Loader active inline size='mini' /> : pagination?.totalItems}
                            </Header>
                        </Grid.Row>
                        <Grid.Row style={{ margin: 0, padding: 0 }}>
                            <Select
                                style={{ width: '95vw', height: '3rem' }}
                                options={t("institutionSortingOptions", { returnObjects: true })}
                                value={selectedInstitutionsSort}
                                onChange={(e, d) => { setInstitutionsSearchSort(d.value as string); setLoading(true) }} />
                        </Grid.Row>
                    </Grid>
                </>
            }
            <div style={{ minHeight: '150rem' }}>
                <Transition
                    visible={!loading}
                    duration={200}
                    size='huge'
                    verticalAlign='middle'>
                    <Transition.Group
                        style={{ zIndex: 1 }}
                        as={List}
                        duration={200}
                        size='huge'
                        verticalAlign='middle'>
                        {institutions.map((institution) =>
                            <List.Item key={institution.id}>
                                <InstitutionsListItem institution={institution} />
                            </List.Item>
                        )}
                        {!loading && !loadingInitial && institutions.length === 0 &&
                            <List.Item>
                                <Segment>
                                    {t(`We've looked everywhere but could not find any results!`)}
                                </Segment>
                            </List.Item>}
                    </Transition.Group>
                </Transition>
            </div>
            <Transition
                visible={loading}
                duration={500}
                size='huge'
                verticalAlign='middle'>
                <div style={{ position: 'absolute', top: '10rem', minHeight: '150rem', maxHeight: '150rem', zIndex: 0 }}>
                    {placeholders}
                </div>
            </Transition>
            {loading &&
                <div style={{ minHeight: '150rem' }}>

                </div>}
        </>
    )
})