import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Item } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import InstitutionsListItem from './InstitutionsListItem';

export default observer(function InstitutionsList() {
    const { institutionStore } = useStore();

    return (

        <Item.Group divided>
            {institutionStore.instititutionsByName.map((institution) => (
                <InstitutionsListItem institution={institution} key={institution.id} />
            ))}
        </Item.Group>

    )
})