import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Header, Icon, Image, Segment, Table } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Institution } from '../../../app/models/institution';
import { Specialty } from '../../../app/models/specialty';
import { useStore } from '../../../app/stores/store';
import { router } from '../../routers/Routes';


export default observer(function InstitutionComparisonBoard() {
    const { institutionStore, specialtyStore } = useStore();
    const { selectedInstitutionIds, loadInstitution, institutionsRegistry } = institutionStore;

    const [selectedInstitutions, setSelectedInstitutions] = useState<Institution[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { t, i18n } = useTranslation();
    useEffect(() => {
        let institutions = new Array<Institution>;
        loadInstitutions().then(() => {
            institutions = selectedInstitutionIds.map((i) => institutionsRegistry.get(i)!);
            setSelectedInstitutions(institutions);
            setLoading(false);
        });
    }, [loadInstitution])

    async function loadInstitutions() {
        await Promise.all(selectedInstitutionIds.map((x) => loadInstitution(x)));
    }

    function BuildRatingStars(rating: number) {
        let elements = [];
        for (let i = 1; i <= Math.round(rating); i++) {
            elements.push((<Icon color='yellow' name='star' key={i} />))
        }
        for (let i = 1; i <= 5 - Math.round(rating); i++) {
            elements.push((<Icon color='yellow' name='star outline' key={5 - i + 1} />))
        }
        return elements;
    }


    // const MaxSpecialtiesCoverage = Math.max(...selectedInstitutions.map((i) => SpecialtiesCoverage(i.specialties)));
    // const MaxAverageEmployment = Math.max(...selectedInstitutions.map((i) => AverageEmployment(i.specialties)));

    if (loading) return <LoadingComponent />

    return (
        <Grid style={{ border: '0', margin: '0', minWidth: '60rem', maxWidth: '85rem' }}>
            <Grid.Column style={{ minWidth: '50px', width: '5%' }} stretched>
            </Grid.Column>
            <Grid.Column style={{ minWidth: '780px', width: '90%' }}>
                <Table celled padded selectable collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            {selectedInstitutions.map((i) =>
                                <Table.HeaderCell
                                    textAlign='center'
                                    key={i.id}>
                                    <Button
                                        basic
                                        floated='right'
                                        style={{ position: 'relative', padding: 0, border: 'none', boxShadow: 'none', width: '3rem', height: '3rem' }}
                                        onClick={() => {
                                            setSelectedInstitutions(selectedInstitutions.filter((x) => x.id != i.id))
                                            institutionStore.toggleSelectedInstitutionId(i.id)
                                            if (institutionStore.selectedInstitutionIds.length === 0) router.navigate('/institutions')
                                        }}>
                                        <Icon name='close' size='large' style={{ left: '0.5rem', bottom: '0.05rem', position: 'relative' }} />
                                    </Button>
                                    <Image
                                        centered
                                        src={i.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                                        style={{ left: '24px', objectFit: 'cover', minHeight: '12rem', minWidth: '12rem', height: '12rem', width: '12rem', borderRadius: '30px' }} />
                                    {i.name}
                                </Table.HeaderCell>)}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row >
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('RATING')}
                                </Header>
                            </Table.Cell>
                            {selectedInstitutions.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'>
                                    {BuildRatingStars(i.rating)}
                                    <Header as='h4' style={{ color: '#777', display: 'block', padding: 0, margin: 0 }} >
                                        {i.reviewsCount + ' ' + t('відгуків')}
                                    </Header>
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row >
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('ACCREDITATION')}
                                </Header>
                            </Table.Cell>
                            {selectedInstitutions.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'>
                                    <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                        {i.accreditation}
                                    </Header>
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row >
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('ENROLLED STUDENTS')}
                                </Header>
                            </Table.Cell>
                            {selectedInstitutions.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'>
                                    <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                        {i.undergraduatesEnrolled}
                                    </Header>
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row >
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('SPECIALTIES COVERAGE')}
                                </Header>
                            </Table.Cell>
                            {selectedInstitutions.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'>
                                    <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                        {}%
                                    </Header>
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row >
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('AVERAGE EMPLOYMENT RATE')}
                                </Header>
                            </Table.Cell>
                            {selectedInstitutions.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'>
                                    <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                        {}%
                                    </Header>
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('AVERAGE EDUCATION COST')}
                                </Header>
                            </Table.Cell>
                            {selectedInstitutions.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'>
                                    <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                        {} UAH
                                    </Header>
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('EDUCATION LANGUAGE')}
                                </Header>
                            </Table.Cell>
                            {selectedInstitutions.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'>
                                    <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                        English, Ukrainian
                                    </Header>
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('STUDY FORMS')}
                                </Header>
                            </Table.Cell>
                            {selectedInstitutions.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'>
                                    <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                        Full-time, Part-time, Extramural,,,
                                    </Header>
                                </Table.Cell>)}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' textAlign='center' color='grey'>
                                    {t('POPULARITY')}
                                </Header>
                            </Table.Cell>
                            {selectedInstitutions.map((i) =>
                                <Table.Cell
                                    key={i.id}
                                    textAlign='center'>
                                    <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                        ???%
                                    </Header>
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