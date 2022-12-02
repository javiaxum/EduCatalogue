import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Institution } from '../../../app/models/institution';
import { useStore } from '../../../app/stores/store';

export default observer(function InstitutionDetails() {
    const { institutionStore } = useStore();
    const { selectedInstitution: institution, openForm, cancelSelectInstitution } = institutionStore;
    if (!institution) return (<></>);
    return (
        <Card fluid>
            <Image src={`/assets/institutionTitleImagePlaceholder.png`} />
            <Card.Content>
                <Card.Header>{institution.name}</Card.Header>
                <Card.Meta>
                    {institution.address}
                </Card.Meta>
                <Card.Description>
                    {institution.description.slice(0, 300) + "..."}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={() => openForm(institution.id)} type='button' content='Edit' />
                    <Button onClick={() => cancelSelectInstitution()} type='button' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})