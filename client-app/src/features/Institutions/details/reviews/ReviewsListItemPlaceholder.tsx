import { Grid, Item, Placeholder, Segment } from 'semantic-ui-react';

interface Props {
    minWidth?: string;
}

export default function ReviewsListItemPlaceholder({ minWidth }: Props) {
    return (
        <Segment style={{ minHeight: '9rem', maxWidth: '50rem', minWidth: '50rem', color: '#444' }}>
            <Placeholder>
                <Grid>
                    <Grid.Column style={{ minWidth: '200px' }}>
                        <Placeholder.Line style={{ width: '100%' }} />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Placeholder.Line />
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Placeholder.Line />
                    </Grid.Column>
                    <Grid.Row>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Grid.Row>
                </Grid>
            </Placeholder>
        </Segment>
    )
};