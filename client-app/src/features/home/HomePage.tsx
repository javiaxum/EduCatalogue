import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Item, ItemGroup } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <Container>
            <Item.Group>
                <Item.Header as={'h1'}content="EduCatalogue" />
                <Button.Group>
                    <Button as={Link} to={`/institutions`} floated='right' content='To Institutions' />
                </Button.Group>
            </Item.Group>
        </Container>
    )
}