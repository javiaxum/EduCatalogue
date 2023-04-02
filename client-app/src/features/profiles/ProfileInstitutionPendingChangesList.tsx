import React from 'react';
import { Header, Segment, Image, Card, Grid } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
    profile: Profile;
}
export default function ProfileInstitutionPendingChangesList({ profile }: Props) {
    const { t } = useTranslation();

    return (
        <>
            {profile.pendingChanges.length === 0 && <Segment basic style={{ width: '100%' }} content={t('There are no pending changes') + '...'} />}
            {profile.pendingChanges.map((pendingChange) => {
                if (pendingChange.institutionName)
                    return (
                        <Card key={pendingChange.id} as={Link} to={`/specialties/${pendingChange.id}`} style={{ width: '100%', padding: '1.5rem' }}>
                            <Card.Header as='h3'>
                                {t('Specialty')}: {pendingChange.name}
                            </Card.Header>
                            <Card.Description>
                                <Header as='h4'>
                                    <Image
                                        src={pendingChange.titleImageUrl || '/assets/user.png'}
                                        style={{ minHeight: '5rem', minWidth: '5rem', borderRadius: '5px' }}
                                        spaced='right' />
                                    {pendingChange.institutionName}
                                </Header>
                            </Card.Description>
                        </Card>)
                else
                    return (
                        <Card key={pendingChange.id} as={Link} to={`/institutions/${pendingChange.id}`} style={{ width: '100%', padding: '1.5rem' }}>
                            <Grid>
                                <Grid.Column width={2} style={{ padding: '0.5rem 1rem 1rem 1rem' }}>
                                    <Image src={pendingChange.titleImageUrl || '/assets/user.png'} style={{ minHeight: '5rem', minWidth: '5rem', borderRadius: '5px' }} />
                                </Grid.Column>
                                <Grid.Column width={10} style={{ padding: '2.5rem 0 0 1.5rem' }} >
                                    <Header as='h3' content={pendingChange.name} />
                                </Grid.Column>
                            </Grid>
                        </Card>)
            })}
        </>
    )
}