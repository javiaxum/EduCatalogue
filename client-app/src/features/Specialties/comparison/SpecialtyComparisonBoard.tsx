import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Header, Icon, Image, Label, Segment, Table } from 'semantic-ui-react';
import PaginationBar from '../../../app/common/pagination/PaginationBar';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Institution } from '../../../app/models/institution';
import { Specialty } from '../../../app/models/specialty';
import { useStore } from '../../../app/stores/store';
import { router } from '../../routers/Routes';


export default observer(function InstitutionComparisonBoard() {
    const { institutionStore, specialtyStore } = useStore();
    const { selectedSpecialtyIds, loadSpecialty, specialtyRegistry, toggleSelectedSpecialtyId, getSpecialtyCoreISCEDString, getSpecialtyCore } = specialtyStore;

    const [selectedSpecialties, setSelectedSpecialties] = useState<Specialty[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { t, i18n } = useTranslation();
    useEffect(() => {
        let specialties = new Array<Specialty>;
        loadSpecialties().then(() => {
            specialties = selectedSpecialtyIds.map((i) => specialtyRegistry.get(i)!);
            setSelectedSpecialties(specialties);
            setLoading(false);
        });
    }, [loadSpecialty])

    async function loadSpecialties() {
        await Promise.all(selectedSpecialtyIds.map((x) => loadSpecialty(x)));
    }
    const degrees = t("degreeOptions", { returnObjects: true }) as [{ text: string; value: number }]
    const languages = t("languageOptions", { returnObjects: true }) as [{ text: string; value: string }]
    const studyForms = t("studyFormOptions", { returnObjects: true }) as [{ text: string; value: number }]

    const maxHeight = Math.max(...selectedSpecialties.map((i) => getSpecialtyCore(i.localSpecialtyCode!)?.name.length || 0));

    if (loading) return <LoadingComponent />

    return (
        <Grid style={{ border: '0', margin: '0', minWidth: '60em' }}>
            <Grid.Column style={{ minWidth: '50px', width: '5%' }} stretched>
            </Grid.Column>
            <Grid.Column style={{ minWidth: '780px', width: '90%' }}>
                <Table celled padded selectable collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            {selectedSpecialties.map((i) =>
                                <Table.HeaderCell
                                    style={{ minWidth: '200px', height: (maxHeight * 1.1) + 40 }}
                                    key={i.id}>
                                    <Button
                                        basic
                                        floated='right'
                                        style={{ position: 'relative', padding: 0, border: 'none', boxShadow: 'none', width: '1rem', height: '1rem', top: 0, right: 0 }}
                                        onClick={() => {
                                            setSelectedSpecialties(selectedSpecialties.filter((x) => x.id != i.id))
                                            toggleSelectedSpecialtyId(i.id)
                                            if (selectedSpecialtyIds.length === 0) router.navigate('/institutions')
                                        }}>
                                        <Icon name='close' size='small' style={{ left: '0.25rem', bottom: '0.05rem', position: 'relative' }} />
                                    </Button>
                                    <Container as={Link} to={`/specialties/${i.id}`}  style={{ height: 'inherit', width: '100%' }}>
                                        {i.localSpecialtyCode} {getSpecialtyCore(i.localSpecialtyCode!)?.name}
                                        <Label content={`${t('ISCED code')}: ${getSpecialtyCoreISCEDString(i.localSpecialtyCode)}`} />
                                    </Container>
                                </Table.HeaderCell>)}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row >
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('PRICE')}
                                </Header>
                            </Table.Cell>
                            {selectedSpecialties.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'>
                                    {i.priceUAH}
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row >
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('SUBSIDED EDUCATION')}
                                </Header>
                            </Table.Cell>
                            {selectedSpecialties.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'
                                    positive={!selectedSpecialties.every((s) => s.nonPaidEducationAvailable) && i.nonPaidEducationAvailable}>
                                    <Icon name={i.nonPaidEducationAvailable ? 'check' : 'x'} />
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row >
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('ENROLLED STUDENTS')}
                                </Header>
                            </Table.Cell>
                            {selectedSpecialties.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'
                                    positive={selectedSpecialties.reduce((max, specialty) => { return specialty.enrolledStudentsCount > max ? specialty.enrolledStudentsCount : max; }, 0) == i.enrolledStudentsCount}>
                                    <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                        {i.enrolledStudentsCount}
                                    </Header>
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('EMPLOYMENT RATE')}
                                </Header>
                            </Table.Cell>
                            {selectedSpecialties.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'
                                    positive={selectedSpecialties.reduce((max, specialty) => { return specialty.graduateEmploymentRate > max ? specialty.graduateEmploymentRate : max; }, 0) == i.graduateEmploymentRate}>
                                    <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                        {i.graduateEmploymentRate}%
                                    </Header>
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('ECTS CREDITS')}
                                </Header>
                            </Table.Cell>
                            {selectedSpecialties.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'
                                    positive={selectedSpecialties.reduce((max, specialty) => { return specialty.ectsCredits > max ? specialty.ectsCredits : max; }, 0) == i.ectsCredits}>
                                    <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                        {i.ectsCredits}
                                    </Header>
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('DEGREE')}
                                </Header>
                            </Table.Cell>
                            {selectedSpecialties.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'>
                                    {degrees[i.degreeId - 1].text}
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('LANGUAGE')}
                                </Header>
                            </Table.Cell>
                            {selectedSpecialties.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'
                                content={i.languageIds.map((l) => languages[l == "en" ? 0 : 1 as number]?.text).join(", ")}>
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('STUDY FORM')}
                                </Header>
                            </Table.Cell>
                            {selectedSpecialties.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'
                                    content={i.studyFormIds.map((s) => studyForms[s - 1]?.text).join(", ")}>
                                </Table.Cell>)}
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Grid.Column>
            <Grid.Column style={{ minWidth: '50px', width: '5%' }} stretched>
            </Grid.Column>
        </Grid>
    )
})