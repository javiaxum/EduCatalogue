import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Divider, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react';
import { number } from 'yup';
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
    const languages = t("languageOptions", { returnObjects: true }) as [{ text: string; value: string }]
    const studyForms = t("studyFormOptions", { returnObjects: true }) as [{ text: string; value: number }]

    if (loadingInitial || loading) return <LoadingComponent />
    if (!selectedSpecialty) return <></>;

    const specialtyLanguages = selectedSpecialty.languageIds.map((i) => languages[i == "en" ? 0 : 1 as number]?.text).join(", ");
    const specialtyStudyForms = selectedSpecialty.studyFormIds.map((i) => studyForms[i - 1]?.text).join(", ");

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
                            to={`/manage/${selectedSpecialty.institutionId}/specialty/${selectedSpecialty.id}`}
                            style={{ width: '16rem', marginLeft: '0', height: '2.5rem' }}
                            content={t('Edit specialty')}
                        />
                    </div>
                </Grid.Row>
                <Grid.Row>
                    <Grid style={{ width: '100%' }}>
                        <Grid.Column width={7}>
                            <Table basic='very' compact>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Label
                                                content={`${t('ISCED code')}: ${getSpecialtyCoreISCEDString(selectedSpecialty.localSpecialtyCode)}`} />
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon
                                                name='book'
                                                size='big'
                                                color='blue' />
                                            {t('Knowledge branch')}: {selectedSpecialty.localSpecialtyCode.slice(0, 2)} {getBranch(selectedSpecialty.localSpecialtyCode.slice(0, 2))?.name}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <Table basic='very' compact>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell style={{ minWidth: '3rem' }}>
                                            <Icon
                                                name='graduation'
                                                size='big'
                                                color='blue' />
                                        </Table.Cell>
                                        <Table.Cell style={{ minWidth: '12rem', maxWidth: '15rem' }}>
                                            {t('Degree')}:
                                        </Table.Cell>
                                        <Table.Cell>
                                            {degrees[selectedSpecialty.degreeId - 1].text}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row >
                                        <Table.Cell>
                                            <Icon
                                                name='clock'
                                                size='big'
                                                color='blue' />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {t('ECTS credits') + ': '}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {selectedSpecialty.ectsCredits} {t('credits')}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon
                                                name='dollar'
                                                size='big'
                                                color='blue' />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {t('Full price')}:
                                        </Table.Cell>
                                        <Table.Cell>
                                            {selectedSpecialty.priceUAH} UAH <br></br>
                                            {selectedSpecialty.nonPaidEducationAvailable && <Label content={t('Non paid education is available')} />}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon
                                                name='flag'
                                                size='big'
                                                color='blue' />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {t('Education period')}:
                                        </Table.Cell>
                                        <Table.Cell>
                                            {selectedSpecialty.startYear} - {selectedSpecialty.endYear}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon
                                                name='user'
                                                size='big'
                                                color='blue' />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {t('Enrolled students count') + ': '}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {selectedSpecialty.enrolledStudentsCount}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon
                                                padding='0.4em 0.2em 0.4em 0.2em'
                                                name='percent'
                                                size='big'
                                                color='blue' />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {t('Graduate employment rate') + ': '}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {selectedSpecialty.graduateEmploymentRate}%
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon
                                                padding='0.4em 0.2em 0.4em 0.2em'
                                                name='language'
                                                size='big'
                                                color='blue' />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {t('Languages') + ': '}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {specialtyLanguages}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon
                                                padding='0.4em 0.2em 0.4em 0.2em'
                                                name='address book'
                                                size='big'
                                                color='blue' />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {t('Study forms') + ': '}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {specialtyStudyForms}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                        <Grid.Column width={6} stretched>
                            <Segment basic style={{ padding: '0' }}>
                                <Header as='h4' content={t('Description')} dividing style={{ marginBottom: '10px' }} />
                                <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{selectedSpecialty.description}</pre>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={3} stretched>
                            <Segment basic style={{ padding: '0' }}>
                                <Header as='h4' content={t('Skills')} dividing style={{ marginBottom: '10px' }} />
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