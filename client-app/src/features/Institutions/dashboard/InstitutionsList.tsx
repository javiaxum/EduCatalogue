import { observer } from 'mobx-react-lite';
import React from 'react';
import { Item } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import InstitutionsListItem from './InstitutionsListItem';

export default observer(function InstitutionsList() {
    const { institutionStore } = useStore();
    const { pagination } = institutionStore;

    if (institutionStore.instititutionsByName.length >= pagination?.totalItems!) {
        let institutions = institutionStore
            .instititutionsByName
            .slice((pagination?.currentPage! - 1) * pagination?.itemsPerPage!, pagination?.currentPage! * pagination?.itemsPerPage!);

        return (
            <Item.Group divided>
                {institutions.map((institution) => (
                    <InstitutionsListItem institution={institution} key={institution.id} />
                ))}
            </Item.Group>
        )
    }
    else {
        return (
            <Item.Group divided>
                {institutionStore.instititutionsByName.map((institution) => (
                    <InstitutionsListItem institution={institution} key={institution.id} />
                ))}
            </Item.Group>
        )
    }
})