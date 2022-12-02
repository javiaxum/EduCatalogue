import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Institution } from '../../../app/models/institution';
import { useStore } from '../../../app/stores/store';

export default observer(function InstitutionsList() {

    const {institutionStore} = useStore();

    return (
        <Segment>
            <Item.Group divided>
                {institutionStore.instititutionsByName.map((institution) => (
                    <Item key={institution.id}>
                        <Item.Content>
                            <Item.Header as='a'>{institution.name}</Item.Header>
                            <Item.Description>{institution.description.slice(0, 250) + " ..."}</Item.Description>
                            <Item.Extra>
                                <Button onClick={() => institutionStore.selectInstitution(institution.id)} floated='right' content='View' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )
                )}
            </Item.Group>
        </Segment>
    )
})