import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Item } from 'semantic-ui-react';
import { Institution } from '../../../app/models/institution';

interface Props {
    institution: Institution
}

export default function InstitutionsListItem({ institution }: Props) {
    return (
        <Item>
            <Item.Content>
                <Item.Header as={Link} to={`/institutions/${institution.id}`}>{institution.name}</Item.Header>
                <Item.Description>{institution.description.slice(0, 250) + " ..."}</Item.Description>
                <Item.Meta>{institution.cityId}, {institution.streetAddress}</Item.Meta>
            </Item.Content>
        </Item>
    )
}