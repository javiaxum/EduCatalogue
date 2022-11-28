import React from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Institution } from '../../../app/models/institution';

interface Props {
    institutions: Institution[];
    selectInstitution: (id: string) => void;
}

export default function InstitutionsList({ institutions, selectInstitution }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {institutions.map((institution) => (
                    <Item key={institution.id}>
                        <Item.Content>
                            <Item.Header as='a'>{institution.name}</Item.Header>
                            <Item.Description>{institution.description.slice(0, 250) + " ..."}</Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectInstitution(institution.id)} floated='right' content='View' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )
                )}
            </Item.Group>
        </Segment>
    )
}