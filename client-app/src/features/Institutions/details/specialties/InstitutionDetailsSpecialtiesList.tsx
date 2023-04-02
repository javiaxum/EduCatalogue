import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Button, Container, Dimmer, Grid, Icon, List, Segment, Transition } from 'semantic-ui-react';
import { SpecialtiesPagingParams } from '../../../../app/models/pagination';
import { useStore } from '../../../../app/stores/store';
import SearchParamsList from '../../../Specialties/search/SearchParamsList';
import SpecialtiesListItemPlaceholder from './SpecialtiesListItemPlaceholder';
import SpecialtyListAddNewItem from './SpecialtyListAddNewItem';
import SpecialtyListItem from './SpecialtyListItem';
import Pagination from '@mui/material/Pagination';

export default observer(function InstitutionDetailsSpecialtiesList() {
    const { commonStore, specialtyStore } = useStore();
    const {
        getSpecialtyCore,
        getSpecialtyCoreISCEDString,
        pagingParams,
        loading,
        loadSpecialties,
        pagination,
        setPagingParams,
        specialtyRegistry } = specialtyStore;
    const { editMode } = commonStore;

    useEffect(() => {
        specialtyStore.setPagingParams(new SpecialtiesPagingParams());
    }, [specialtyStore, specialtyStore.setPagingParams])

    const { t } = useTranslation();
    const [sidebarOpened, setSidebarOpened] = useState(false);
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    function handleLoad(i: number) {
        setPagingParams(new SpecialtiesPagingParams(i));
        specialtyRegistry.clear();
        loadSpecialties();
    }

    let specialties = Array.from(specialtyRegistry.values());

    let placeholders = [];
    for (let i = 0; i < pagingParams.pageSize; i++) {
        placeholders.push(<SpecialtiesListItemPlaceholder key={i} />);
    }
    return (
        <>
            <Transition
                style={{ zIndex: 1000, position: 'fixed', width: '100%', height: '100%' }}
                visible={sidebarOpened}
                duration={500}>
                <Dimmer active={sidebarOpened} style={{ zIndex: 1000, position: 'fixed', width: '100%', height: '100%' }} />
            </Transition>
            {isComputerOrTablet &&
                <Grid style={{ margin: 0 }}>
                    <Grid.Column width={11} style={{ padding: 0 }}>
                        <Container style={{ textAlign: 'center', padding: '0 0 0.5rem 0' }}>
                            <Pagination
                                hidePrevButton
                                hideNextButton
                                size='large'
                                variant="outlined" shape="rounded"
                                style={{ margin: '0 auto', width: 'fit-content' }}
                                count={pagination?.totalPages}
                                page={pagination?.currentPage}
                                onChange={(e, data) => { handleLoad(data) }} />
                        </Container>
                        <Grid style={{ margin: 0 }} >
                            <Transition
                                visible={loading}
                                duration={500}>
                                <div style={{ display: 'inline-block', position: 'absolute', zIndex: 0, padding: 0 }}>
                                    {placeholders}
                                </div>
                            </Transition>
                            {specialties.map((specialty) =>
                                <SpecialtyListItem
                                    key={specialty.id}
                                    specialty={specialty}
                                    specialtyCore={getSpecialtyCore(specialty.localSpecialtyCode)!}
                                    iscedCodeString={getSpecialtyCoreISCEDString(specialty.localSpecialtyCode)} />)}
                            {(specialties.length === 0 && !loading && !editMode) &&
                                <Segment basic style={{ color: '#444', width: '40rem' }}>{t('No specialties were found')}...</Segment>}
                            {(editMode && specialties.length === pagination?.itemsPerPage) &&
                                <SpecialtyListAddNewItem />}
                        </Grid>
                    </Grid.Column >
                    <Grid.Column width={5} style={{ padding: 0, top: '-4rem', zIndex: 100 }}>
                        <Segment>
                            <SearchParamsList />
                            <Button icon='trash' onClick={() => specialtyStore.resetSearchParams()} basic style={{ position: 'absolute', right: 0, top: '0.3rem' }} />
                        </Segment>
                    </Grid.Column>
                </Grid >}
            {isMobile &&
                <Grid style={{ margin: 0, minHeight: '45rem', alignItems: 'flex-start' }}>
                    <Grid.Row style={{ padding: 0 }}>
                        <div style={{ textAlign: 'center', padding: '0 0 0.5rem 0', width: '100%' }}>
                            <Button
                                style={{ height: '3.4rem' }}
                                onClick={() => setSidebarOpened(true)}>
                                <Icon name='options' size='big' />
                                {t('Filters')}
                            </Button>
                            <Pagination
                                hidePrevButton
                                hideNextButton
                                size='large'
                                variant="outlined" shape="rounded"
                                style={{ margin: '3rem auto 0 auto', width: '100%' }}
                                count={pagination?.totalPages}
                                page={pagination?.currentPage}
                                onChange={(e, data) => { handleLoad(data) }} />
                        </div>
                        <Grid style={{ margin: 0, display: 'contents', alignItems: 'flex-start', alignContent: 'center' }}>
                            <Transition
                                visible={loading}
                                duration={500}>
                                <div style={{ display: 'inline-block', position: 'absolute', zIndex: 0, padding: 0, left: 0, top: '3.8rem' }}>
                                    {placeholders}
                                </div>
                            </Transition>
                            {specialties.map((specialty) =>
                                <SpecialtyListItem
                                    key={specialty.id}
                                    specialty={specialty}
                                    specialtyCore={getSpecialtyCore(specialty.localSpecialtyCode)!}
                                    iscedCodeString={getSpecialtyCoreISCEDString(specialty.localSpecialtyCode)} />)}
                            {(specialties.length === 0 && !loading && !editMode) &&
                                <Segment basic style={{ color: '#444', width: '40rem' }}>{t('No specialties were found')}...</Segment>}
                            {(editMode && specialties.length === pagination?.itemsPerPage) &&
                                <SpecialtyListAddNewItem />}
                        </Grid>
                    </Grid.Row>
                    <Grid.Row>
                        <Transition
                            visible={sidebarOpened}
                            animation='fade left'
                            timeout={400}
                            unmountOnExit>
                            <Segment style={{ position: 'fixed', top: '5rem', zIndex: 1000, borderRadius: 0, maxHeight: '90vh' }}>
                                <Button
                                    basic
                                    floated='right'
                                    style={{ position: 'relative', padding: 0, border: 'none', boxShadow: 'none', width: '1rem', height: '1rem', top: 0, right: '1rem' }}
                                    onClick={() => setSidebarOpened(false)}>
                                    <Icon name='close' size='large' style={{ left: '0.25rem', bottom: '0.05rem', position: 'relative' }} />
                                </Button>
                                <Button
                                    size='big'
                                    onClick={() => specialtyStore.resetSearchParams()}
                                    style={{ position: 'relative' }}>
                                    {t('Reset search parameters')}
                                </Button>
                                <SearchParamsList />
                            </Segment>
                        </Transition>
                    </Grid.Row>
                </Grid>}
        </>

    )
})