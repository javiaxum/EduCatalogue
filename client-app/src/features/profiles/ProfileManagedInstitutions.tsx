import React from "react";
import { Grid, Item, Segment, Image, Header } from "semantic-ui-react";
import { ManagedInstitution } from "../../app/models/profile";

interface Props {
    institutions: ManagedInstitution[];
}

export default function ProfileManagedInstitutions({institutions}: Props) {
    return (
        <Item.Group>
            {institutions.map((institution) =>
                <Segment.Group>
                    <Segment key={institution.id}>
                        <Grid>
                            <Grid.Column width={2} style={{ padding: '0.5rem 1rem 1rem 1rem' }}>
                                <Image src={institution.titleImageUrl || '/assets/user.png'} avatar style={{ minHeight: '5rem', minWidth: '5rem' }} spaced='right' />
                            </Grid.Column>
                            <Grid.Column width={10} style={{ padding: '2.5rem 0 0 1.5rem' }} >
                                <Header as='h4' content={institution.name} />
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    {/* <Segment>
                        <ReviewListItem review={review} key={review.id} />
                    </Segment> */}
                </Segment.Group>
            )}
        </Item.Group>
    )
}