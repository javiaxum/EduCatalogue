import { observer } from 'mobx-react-lite';
import React from 'react';
import { Divider, Header, Item, Segment, Select } from 'semantic-ui-react';
import { institutionSortingOptions } from '../../../app/common/options/institutionSortingOptions';
import { useStore } from '../../../app/stores/store';
import InstitutionsListItem from './InstitutionsListItem';
import InstitutionsListItemPlaceholder from './InstitutionsListItemPlaceholder';

export default observer(function InstitutionsList() {
    const { institutionStore } = useStore();
    const { pagination, pagingParams } = institutionStore;

    let placeholders = [];
    for (let i = 0; i < pagingParams.pageSize; i++) {
        placeholders.push(<InstitutionsListItemPlaceholder key={i} />);
    }
    return (
        <>
            <Header as='h2' content="Institutions" style={{ display: 'inline' }} />
            {!institutionStore.loading
                &&
                <Header
                    as='h5'
                    color='grey'
                    content={`found ${pagination?.totalItems} ${pagination?.totalItems === 1 ? 'item' : 'items'}`}
                    style={{ display: 'inline', marginLeft: '20px' }} />}
            <Divider horizontal>
                <Select
                    style={{ left: '0px' }}
                    options={institutionSortingOptions}
                    min={0}
                />
            </Divider>
            <Item.Group divided>
                {institutionStore.loadingInitial || institutionStore.loading ? (
                    <>
                        {placeholders}
                    </>
                ) : (
                    <>
                        {institutionStore.institutionsRegistry.size === 0
                            ? (<>
                                <Segment>No results were found...</Segment>
                            </>)
                            : (<>
                                {institutionStore.instititutionsByName.map((institution) => (
                                    <InstitutionsListItem institution={institution} key={institution.id} />
                                ))}
                            </>)}
                    </>
                )}
            </Item.Group>
        </>
    )
})