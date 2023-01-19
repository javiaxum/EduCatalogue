import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';

export default function CustomFooter() {
    return (
        <Segment className='foot' basic style={{background: '#eee', border: '0', margin: '0'}} >
            <Grid style={{border: '0', margin: '0'}}>
                <Grid.Column width={3}>
                    <Header as='h4' content='@ EduCatalogue 2023' color='grey' />
                </Grid.Column>
            </Grid>
        </Segment>
    )
}