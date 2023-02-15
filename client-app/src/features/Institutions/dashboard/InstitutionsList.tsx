import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Divider, Header, Item, Segment, Select } from 'semantic-ui-react';
import { institutionSortingOptions } from '../../../app/common/options/institutionSortingOptions';
import { useStore } from '../../../app/stores/store';
import InstitutionsListItem from './InstitutionsListItem';
import InstitutionsListItemPlaceholder from './InstitutionsListItemPlaceholder';

export default observer(function InstitutionsList() {
    const { institutionStore } = useStore();
    const {
        pagination,
        pagingParams,
        setInstitutionsSearchSort,
        institutionSearchSort,
        loading,
        instititutionsBySelectedSort,
        institutionsRegistry,
        loadingInitial } = institutionStore;

    let placeholders = [];
    for (let i = 0; i < pagingParams.pageSize; i++) {
        placeholders.push(<InstitutionsListItemPlaceholder key={i} />);
    }
    

    return (
        <>
            <Header as='h2' content="Institutions" style={{ display: 'inline' }} />
            {!loading &&
                <Header
                    as='h5'
                    color='grey'
                    content={`found ${pagination?.totalItems} ${pagination?.totalItems === 1 ? 'item' : 'items'}`}
                    style={{ display: 'inline', marginLeft: '20px' }} />}<br></br>
            <Select
                style={{ left: '0px', marginTop: '1rem', display: 'inline-block' }}
                options={institutionSortingOptions}
                value={institutionSearchSort}
                onChange={(e, d) => setInstitutionsSearchSort(d.value as string)}
            />
            <Divider style={{ width: 'calc(100% - 17rem)', display: 'inline-block', margin: '0rem 0 0 1rem', position: 'absolute', top: '6.9rem' }} />
            <Item.Group divided>
                {loadingInitial || loading
                    ? (
                        <>
                            {placeholders}
                        </>
                    ) : (
                        <>
                            {institutionsRegistry.size === 0
                                ? (<>
                                    <Segment>No results were found...</Segment>
                                </>)
                                : (<>
                                    {instititutionsBySelectedSort.map((institution) => (
                                        <InstitutionsListItem institution={institution} key={institution.id} />
                                    ))}
                                </>)}
                        </>
                    )}
            </Item.Group>
        </>
    )
})