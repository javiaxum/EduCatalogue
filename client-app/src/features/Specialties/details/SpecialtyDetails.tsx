import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Divider, Grid, Header, Icon, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import SpecialtyDetailsComponentList from './educationalComponent/SpecialtyDetailsComponentList';

export default observer(function SpecialtyDetails() {
    const { specialtyStore, commonStore, institutionStore } = useStore()
    const { selectedSpecialty, loadSpecialty, loadingInitial, getSpecialtyCore, getBranch, getSkill, getSpecialtyCoreISCEDString, loading } = specialtyStore;
    const { } = institutionStore;
    const { editMode, setEditMode } = commonStore;
    const { id } = useParams();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (id) loadSpecialty(id).then();
        setEditMode(false);
    }, [loadSpecialty, selectedSpecialty, id]);

    const degrees = t("degreeOptions", { returnObjects: true }) as [{ text: string; value: number }]
    if (loadingInitial || loading) return <LoadingComponent />
    if (!selectedSpecialty) return <></>;

    return (
        <Segment basic style={{ width: '80%', minWidth: '1000px', marginLeft: '10%' }}>
            <Grid style={{ padding: '20px 0 0 0', color: '#444' }}>
                <Grid.Row>
                    <Header
                        size='large'
                        style={{ margin: '0', height: '35px' }}
                    >
                        {t('Code and specialty')}:<Label
                            size='big'
                            content={`${selectedSpecialty.localSpecialtyCode} ${getSpecialtyCore(selectedSpecialty.localSpecialtyCode!)?.name}`}
                            style={{ padding: '0.5rem 0.5rem 0.5rem 0.5rem' }} />
                    </Header>
                    <div style={{ marginLeft: 'auto' }}>
                        <Button
                            onClick={() => commonStore.setEditMode(false)}
                            as={Link}
                            to={`/institutions/${institutionStore.selectedInstitution?.id}`}
                            style={{ width: '16rem', height: '2.5rem' }}
                            content={t('To institution')}
                        />
                        <Button
                            onClick={() => commonStore.setEditMode(true)}
                            as={Link}
                            to={`/manage/${institutionStore.selectedInstitution?.id}/specialty/${selectedSpecialty.id}`}
                            style={{ width: '16rem', marginLeft: '0', height: '2.5rem' }}
                            content={t('Edit specialty')}
                        />
                    </div>
                </Grid.Row>
                <Grid.Row>
                    <Grid style={{ width: '100%' }}>
                        <Grid.Column width={6}>
                            <Segment.Group style={{ boxShadow: 'none', border: '0' }}>
                                <Segment>
                                    <Label
                                        content={`${t('ISCED code')}: ${getSpecialtyCoreISCEDString(selectedSpecialty.localSpecialtyCode)}`}
                                    />
                                </Segment>
                                <Segment>
                                    <Icon
                                        name='book'
                                        size='big'
                                        color='blue' />
                                    {t('Knowledge branch')}: {selectedSpecialty.localSpecialtyCode.slice(0, 2)} {getBranch(selectedSpecialty.localSpecialtyCode.slice(0, 2))?.name}
                                </Segment>
                                <Segment basic>
                                    <Icon
                                        name='graduation'
                                        size='big'
                                        color='blue' />
                                    {t('Degree')}: {degrees[selectedSpecialty.degreeId - 1].text}
                                </Segment>
                                <Segment basic>
                                    <Icon
                                        name='clock'
                                        size='big'
                                        color='blue' />
                                    {t('ECTS credits')}: {selectedSpecialty.ectsCredits} {t('credits')}
                                </Segment>
                                <Segment basic>
                                    <Icon
                                        name='dollar'
                                        size='big'
                                        color='blue' />
                                    {t('Full price')}: {selectedSpecialty.priceUAH} UAH
                                    {selectedSpecialty.nonPaidEducationAvailable && <Label content={t('Non paid education is available')} />}
                                </Segment>
                                <Segment basic>
                                    <Icon
                                        name='flag'
                                        size='big'
                                        color='blue' />
                                    {t('Education period')}: {selectedSpecialty.startYear} - {selectedSpecialty.endYear}
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>
                        <Grid.Column width={6} stretched>
                            <Segment basic style={{ boxShadow: 'none', padding: '30px' }}>
                                <Header as='h4' content={t('Description')} dividing />
                                <Segment basic style={{ padding: '0 0 0 10px' }}>
                                    {selectedSpecialty.description}
                                </Segment>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={4} stretched>
                            <Segment basic style={{ boxShadow: 'none', padding: '30px' }}>
                                <Header as='h4' content={t('Skills')} dividing style={{ marginBottom: '5px' }} />
                                {selectedSpecialty.skillIds.map((skill) => <Label key={skill} content={getSkill(skill)?.name} style={{ margin: '0.2rem' }} />)}
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
                <Grid.Row style={{ padding: '0' }}>
                    <Divider />
                    <Header
                        content={t('Educational components') + ':'}
                        size='huge'
                        style={{ padding: '0', color: '#444' }} />
                </Grid.Row>
                <Grid.Row>
                    <SpecialtyDetailsComponentList />
                </Grid.Row>
            </Grid>
        </Segment >
    )
})