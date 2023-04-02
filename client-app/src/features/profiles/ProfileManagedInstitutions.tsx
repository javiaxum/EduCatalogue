import { Link } from "react-router-dom";
import { Grid, Segment, Image, Header, Card } from "semantic-ui-react";
import { ManagedInstitution } from "../../app/models/profile";
import { useTranslation } from "react-i18next";

interface Props {
    institutions: ManagedInstitution[];
}

export default function ProfileManagedInstitutions({ institutions }: Props) {
    const { t } = useTranslation();

    return (
        <>
            {!institutions || institutions.length === 0 ? <Segment basic content={t('There are no institutions you have been added to') + '...'} /> :
                <>{institutions.map((institution) =>
                    <Card key={institution.id} as={Link} to={`/institutions/${institution.id}`} style={{ width: '100%', padding: '1.5rem' }}>
                        <Grid>
                            <Grid.Column width={2} style={{ padding: '0.5rem 1rem 1rem 1rem' }}>
                                <Image src={institution.titleImageUrl || '/assets/user.png'} style={{ minHeight: '5rem', minWidth: '5rem', borderRadius: '5px' }} />
                            </Grid.Column>
                            <Grid.Column width={10} style={{ padding: '2.5rem 0 0 1.5rem' }} >
                                <Header as='h3' content={institution.name} />
                            </Grid.Column>
                        </Grid>
                    </Card>
                )}</>}
        </>
    )
}