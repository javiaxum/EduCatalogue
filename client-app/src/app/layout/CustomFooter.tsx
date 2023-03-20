import { Grid, List } from 'semantic-ui-react';

export default function CustomFooter() {
    return (
        <footer>
            <Grid style={{ color: '#444',top: 0, background: '#eee', margin: 0, height: '24rem', minWidth: '85rem', padding: 0 }}>
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
        </footer>
    )
}