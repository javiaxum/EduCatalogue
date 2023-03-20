import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Container, Grid, Pagination, Segment } from 'semantic-ui-react';
import { SpecialtiesPagingParams } from '../../../../app/models/pagination';
import { useStore } from '../../../../app/stores/store';
import SearchParamsList from '../../../Specialties/search/SearchParamsList';
import SpecialtiesListItemPlaceholder from './SpecialtiesListItemPlaceholder';
import SpecialtyListAddNewItem from './SpecialtyListAddNewItem';
import SpecialtyListItem from './SpecialtyListItem';

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
        specialtyStore.loadSpecialties();
    }, [specialtyStore, specialtyStore.loadSpecialties])

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
        <Grid style={{ margin: 0 }}>
            <Grid.Column width={11} style={{ padding: 0 }}>
                <Container style={{ textAlign: 'center', padding: '0 0 0.5rem 0' }}>
                    <Pagination
                        totalPages={pagination?.totalPages!}
                        activePage={pagination?.currentPage}
                        onPageChange={(e, data) => handleLoad(data.activePage as number)} />
                </Container>
                <Grid>
                    {loading ?
                        placeholders :
                        <>
                            {(specialties.length === 0)
                                ? <Segment style={{ color: '#444', width: '10rem' }}>There are no specialties available...</Segment>
                                : <>
                                    {specialties.map((specialty) => (
                                        <SpecialtyListItem
                                            specialty={specialty}
                                            specialtyCore={getSpecialtyCore(specialty.localSpecialtyCode)!}
                                            key={specialty.id}
                                            iscedCodeString={getSpecialtyCoreISCEDString(specialty.localSpecialtyCode)} />
                                    ))}
                                </>}
                            {editMode &&
                                <SpecialtyListAddNewItem />}
                        </>}
                </Grid>
            </Grid.Column>
            <Grid.Column width={5} style={{ padding: 0, top: '-2rem' }}>
                <Segment>
                    <SearchParamsList />
                </Segment>
            </Grid.Column>
        </Grid>
    )
})