import { observer } from 'mobx-react-lite';
import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import InstitutionsListItem from './InstitutionsListItem';
import InstitutionsListItemPlaceholder from './InstitutionsListItemPlaceholder';

export default observer(function InstitutionsList() {
    const { institutionStore } = useStore();
    const { pagination } = institutionStore;

    return (
        <Item.Group divided>
            {institutionStore.loadingInitial || institutionStore.loading ? (
                <>
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
                            {institutionStore.instititutionsByNameForPage.map((institution) => (
                                <InstitutionsListItem institution={institution} key={institution.id} />
                            ))}
                        </>)}
                </>
            )}
        </Item.Group>
    )
})