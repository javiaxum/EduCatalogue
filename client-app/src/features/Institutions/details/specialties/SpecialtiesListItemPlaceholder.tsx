import { Fragment } from 'react';
import { Grid, Placeholder, Segment } from 'semantic-ui-react';

export default function SpecialtiesListItemPlaceholder() {
    return (
        <Grid.Column style={{ width: '245px', overflow: 'hidden' }}>
            <Placeholder>
                <Placeholder.Image style={{height: '200px'}}/>
            </Placeholder>
        </Grid.Column>
    );
};