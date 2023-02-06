import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Item, Segment, Image, Header, Card } from "semantic-ui-react";
import { ManagedInstitution } from "../../app/models/profile";

interface Props {
    institutions: ManagedInstitution[];
}

export default function ProfileManagedInstitutions({ institutions }: Props) {


    useEffect(() => {
        console.log(institutions[0].titleImageUrl);
    })

    return (
        <Item.Group>
            {institutions.map((institution) =>
                <Segment.Group>
                    <Card key={institution.id} as={Link} to={`/institutions/${institution.id}`} style={{width: '100%', height: '7rem', padding: '1.5rem 0 0 0'}}>
                        <Grid>
                            <Grid.Column width={2} style={{ padding: '0.5rem 1rem 1rem 3rem' }}>
                                <Image src={institution.titleImageUrl || '/assets/user.png'} avatar style={{ minHeight: '5rem', minWidth: '5rem' }} spaced='right' />
                            </Grid.Column>
                            <Grid.Column width={10} style={{ padding: '2.5rem 0 0 1.5rem' }} >
                                <Header as='h4' content={institution.name} />
                            </Grid.Column>
                        </Grid>
                    </Card>
                </Segment.Group>
            )}
        </Item.Group>
    )
}