import React from 'react';
import { Grid, Header, List, Menu, Segment } from 'semantic-ui-react';

export default function CustomFooter() {
    return (
        <Grid style={{ background: '#eee', border: '0', margin: '0', width: '100%', padding: '1rem' }}>
            <Grid.Row>
                <Grid.Column style={{ width: '15rem' }}>
                    <List link >
                        <List.Item as='a'>About Us</List.Item>
                        <List.Item as='a'>Contact Us</List.Item>
                        <List.Item as='a'>FAQ</List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column width={7}>
                    <p>@EduCatalogue 2023</p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}