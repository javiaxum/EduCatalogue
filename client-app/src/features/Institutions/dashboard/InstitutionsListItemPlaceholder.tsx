import { Grid, Placeholder } from 'semantic-ui-react';

interface Props {
    minWidth?: string;
}

export default function InstitutionsListItemPlaceholder({minWidth}: Props) {
    return (
        <Placeholder fluid style={{ marginTop: 10, minHeight: '6rem', minWidth: '50rem' }}>
            <Grid>
                <Grid.Column style={{ width: '13rem', minWidth: '13rem' }}>
                    <Placeholder.Image style={{ objectFit: 'cover', minHeight: '12rem', minWidth: '12rem', maxHeight: '12rem', maxWidth: '12rem', borderRadius: '30px' }} />
                </Grid.Column>
                <Grid.Column style={{ width: 'calc(100% - 14rem)' }}>
                    <Grid style={{ width: '100%', padding: '0 0 0 5%' }}>
                        <Grid.Row style={{ paddingBottom: '0' }}>
                            <Placeholder.Line />
                        </Grid.Row>
                        <Grid.Row style={{ padding: '0 0 1rem 0' }}>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
                <Grid.Column style={{ width: '100%' }}>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Grid.Column>
            </Grid>
        </Placeholder>
    );
};