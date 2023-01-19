import { observer } from 'mobx-react-lite';
import React from 'react';
import { Divider, Header, Item, Segment, Select } from 'semantic-ui-react';
import CustomSelectInput from '../../../app/common/form/CustomSelectInput';
import { sortingOptions } from '../../../app/common/options/sortingOptions';
import { useStore } from '../../../app/stores/store';
import InstitutionsListItem from './InstitutionsListItem';
import InstitutionsListItemPlaceholder from './InstitutionsListItemPlaceholder';

export default observer(function InstitutionsList() {
    const { institutionStore } = useStore();
    const { pagination } = institutionStore;

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
                    options={sortingOptions}
                    min={0}
                />
            </Divider>
            <Item.Group divided>
                {institutionStore.loadingInitial || institutionStore.loading ? (
                    <>
                        <InstitutionsListItemPlaceholder />
                        <InstitutionsListItemPlaceholder />
                        <InstitutionsListItemPlaceholder />
                        <InstitutionsListItemPlaceholder />
                        <InstitutionsListItemPlaceholder />
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