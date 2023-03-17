import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import PaginationBar from '../../../../app/common/pagination/PaginationBar';
import { SpecialtiesPagingParams } from '../../../../app/models/pagination';
import { useStore } from '../../../../app/stores/store';
import SearchParamsList from '../../../Specialties/search/SearchParamsList';
import SpecialtiesListItemPlaceholder from './SpecialtiesListItemPlaceholder';
import SpecialtyListAddNewItem from './SpecialtyListAddNewItem';
import SpecialtyListItem from './SpecialtyListItem';

export default observer(function InstitutionDetailsSpecialtiesList() {
    const { institutionStore, commonStore, specialtyStore } = useStore();
    const { getSpecialtyCore, getSpecialtyCoreISCEDString, pagingParams, loading, loadSpecialties, pagination, setPagingParams, selectedBranches, selectedSpecialties, selectedSkillIds, specialtyRegistry } = specialtyStore;
    const { selectedInstitution } = institutionStore;
    const { editMode } = commonStore;

    useEffect(() => {
        specialtyStore.loadSpecialties();
    }, [specialtyStore.loadSpecialties])

    if (!selectedInstitution || !selectedInstitution.specialties) return <></>;

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
        <Grid >
            <Grid.Column style={{ minWidth: '500px', width: '69%' }}>
                <Container style={{ textAlign: 'center', padding: '0 0 0.5rem 0'}}>
                    <PaginationBar handleLoad={handleLoad} pagination={pagination} />
                </Container>
                <Grid>
                    {loading ? placeholders : (
                        <>
                            {(specialties.length === 0)
                                ? <Segment style={{ color: '#444', width: '300px' }}>There are no specialties available...</Segment>
                                : (
                                    <>
                                        {specialties.map((specialty) => (
                                            <SpecialtyListItem
                                                specialty={specialty}
                                                specialtyCore={getSpecialtyCore(specialty.localSpecialtyCode)!}
                                                key={specialty.id}
                                                iscedCodeString={getSpecialtyCoreISCEDString(specialty.localSpecialtyCode)} />
                                        ))}
                                    </>
                                )}
                            {editMode &&
                                <SpecialtyListAddNewItem />
                            }
                        </>
                    )}
                </Grid>
            </Grid.Column>
            <Grid.Column floated='right' style={{ minWidth: '300px', width: '18%', top: '-2rem' }}>
                <SearchParamsList />
            </Grid.Column>
        </Grid>
    )
})