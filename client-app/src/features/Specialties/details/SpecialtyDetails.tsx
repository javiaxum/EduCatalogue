import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Link, useParams } from 'react-router-dom';
import { Button, Divider, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import TableItem from '../../Institutions/details/TableItem';
import SpecialtyDetailsComponentList from './educationalComponent/SpecialtyDetailsComponentList';

export default observer(function SpecialtyDetails() {
    const { specialtyStore, commonStore, institutionStore, profileStore } = useStore()
    const { selectedSpecialty, loadSpecialty, loadingInitial, loading, getSpecialtyCore, getBranch, getSkill, getSpecialtyCoreISCEDString } = specialtyStore;
    const { setEditMode } = commonStore;
    const { id } = useParams();
    const { t } = useTranslation();
    const [descriptionOpened, setDescriptionOpened] = useState(false);

    useEffect(() => {
        if (id) loadSpecialty(id);
        setEditMode(false);
    }, [loadSpecialty, selectedSpecialty, id, setEditMode]);

    const degrees = t("degreeOptions", { returnObjects: true }) as [{ text: string; value: number }]
    const languages = t("languageOptions", { returnObjects: true }) as [{ text: string; value: string }]
    const studyForms = t("studyFormOptions", { returnObjects: true }) as [{ text: string; value: number }]

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    if (!selectedSpecialty) return <></>;

    const specialtyLanguages = selectedSpecialty.languageIds.map((i) => languages[i === "en" ? 0 : 1 as number]?.text).join(", ");
    const specialtyStudyForms = selectedSpecialty.studyFormIds.map((i) => studyForms[i - 1]?.text).join(", ");

    return (
        <>
            {isComputerOrTablet &&
                <Grid style={{ padding: 0, color: '#444', minWidth: '65rem', width: '80%', margin: '0 auto' }}>
                    <Grid.Row>
                        <Header
                            size='large'
                            style={{ margin: '0', height: '35px', color: '#444', width: 'calc(100% - 30rem)' }}>
                            <Label
                                size='big'
                                content={`${selectedSpecialty.localSpecialtyCode} ${getSpecialtyCore(selectedSpecialty.localSpecialtyCode!)?.name}`}
                                style={{ padding: '0.5rem' }} />
                        </Header>
                        <Button.Group style={{ width: '25rem', margin: '0 0 0 auto', height: '35px' }}>
                            <Button
                                onClick={() => commonStore.setEditMode(false)}
                                as={Link}
                                to={`/institutions/${institutionStore.selectedInstitution?.id}`}
                                content={t('To institution')}
                            />
                            {(institutionStore.isInstitutionManager || profileStore.isOperator) && <Button
                                onClick={() => commonStore.setEditMode(true)}
                                as={Link}
                                to={`/manage/${selectedSpecialty.institutionId}/specialty/${selectedSpecialty.id}`}
                                content={t('Edit specialty')}
                            />}
                        </Button.Group>
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
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='graduation'
                                            label={t('Degree')}
                                            content={degrees[selectedSpecialty.degreeId - 1].text} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='clock'
                                            label={t('ECTS credits')}
                                            content={selectedSpecialty.ectsCredits} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='dollar'
                                            label={t('Tuition')}
                                            content={<>{selectedSpecialty.tuitionUAH} UAH <br></br>
                                                {selectedSpecialty.freeEducation && <Label content={t('Free education available')} />}</>} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='flag'
                                            label={t('Education period')}
                                            content={selectedSpecialty.startYear + ' - ' + selectedSpecialty.endYear} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='user'
                                            label={t('Enrolled students count')}
                                            content={selectedSpecialty.undergraduatesEnrolled} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='percent'
                                            label={t('Acceptance rate')}
                                            content={selectedSpecialty.acceptanceRate + '%'} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='percent'
                                            label={t('Graduation rate')}
                                            content={selectedSpecialty.graduationRate + '%'} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='percent'
                                            label={t('Graduate employment rate')}
                                            content={selectedSpecialty.graduateEmploymentRate + '%'} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='language'
                                            label={t('Language')}
                                            content={specialtyLanguages} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='address book'
                                            label={t('Study form')}
                                            content={specialtyStudyForms} />
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                            <Grid.Column width={6} stretched>
                                <Segment basic style={{ padding: '0' }}>
                                    <Header as='h4' content={t('Description')} dividing style={{ marginBottom: '10px' }} />
                                    <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                                        <>
                                            {selectedSpecialty.description.slice(0, descriptionOpened ? 6000 : 400)}
                                            {(!descriptionOpened && selectedSpecialty.description.length > 400) && <>...
                                                <Button
                                                    type='button'
                                                    basic
                                                    size='small'
                                                    onClick={() => setDescriptionOpened(true)}>
                                                    {t('Read more') + '>>'}
                                                </Button>
                                            </>}
                                        </>
                                    </pre>
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
                            style={{ padding: '0', color: '#444', margin: 0 }} />
                    </Grid.Row>
                    <Grid.Row>
                        <SpecialtyDetailsComponentList />
                    </Grid.Row>
                </Grid>}
            {isMobile &&
                <Segment basic style={{ width: '90%', padding: 0, margin: '0 auto' }}>
                    <Button.Group style={{ margin: '1rem 0' }} attached='bottom'>
                        <Button
                            onClick={() => commonStore.setEditMode(false)}
                            as={Link}
                            to={`/institutions/${institutionStore.selectedInstitution?.id}`}
                            content={t('To institution')} />
                        {(institutionStore.isInstitutionManager || profileStore.isOperator) && <Button
                            onClick={() => commonStore.setEditMode(true)}
                            as={Link}
                            to={`/manage/${selectedSpecialty.institutionId}/specialty/${selectedSpecialty.id}`}
                            content={t('Edit specialty')} />}
                    </Button.Group>
                    <Grid style={{ padding: 0, color: '#444', margin: 0 }}>
                        <Grid.Row style={{ paddingBottom: 0 }}>
                            <Header
                                size='large'
                                style={{ margin: '0', height: '35px' }}>
                                <Label
                                    size='big'
                                    content={`${selectedSpecialty.localSpecialtyCode} ${getSpecialtyCore(selectedSpecialty.localSpecialtyCode!)?.name}`}
                                    style={{ padding: '0.5rem' }} />
                            </Header>
                        </Grid.Row>
                        <Grid.Row style={{ paddingTop: 0 }}>
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
                            <Table basic='very' compact unstackable>
                                <Table.Body>
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='graduation'
                                        label={t('Degree')}
                                        content={degrees[selectedSpecialty.degreeId - 1].text} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='clock'
                                        label={t('ECTS credits')}
                                        content={selectedSpecialty.ectsCredits} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='dollar'
                                        label={t('Tuition')}
                                        content={<>{selectedSpecialty.tuitionUAH} UAH <br></br>
                                            {selectedSpecialty.freeEducation && <Label content={t('Free education available')} />}</>} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='flag'
                                        label={t('Education period')}
                                        content={selectedSpecialty.startYear + ' - ' + selectedSpecialty.endYear} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='user'
                                        label={t('Enrolled students count')}
                                        content={selectedSpecialty.undergraduatesEnrolled} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='percent'
                                        label={t('Acceptance rate')}
                                        content={selectedSpecialty.acceptanceRate + '%'} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='percent'
                                        label={t('Graduation rate')}
                                        content={selectedSpecialty.graduationRate + '%'} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='percent'
                                        label={t('Graduate employment rate')}
                                        content={selectedSpecialty.graduateEmploymentRate + '%'} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='language'
                                        label={t('Language')}
                                        content={specialtyLanguages} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='address book'
                                        label={t('Study form')}
                                        content={specialtyStudyForms} />
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                        <Grid.Row>
                            <Segment basic style={{ padding: '0' }}>
                                <Header as='h4' content={t('Description')} dividing style={{ marginBottom: '10px' }} />
                                <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                                    <>
                                        {selectedSpecialty.description.slice(0, descriptionOpened ? 6000 : 400)}
                                        {(!descriptionOpened && selectedSpecialty.description.length > 400) && <>...
                                            <Button
                                                type='button'
                                                basic
                                                size='small'
                                                onClick={() => setDescriptionOpened(true)}>
                                                {t('Read more') + '>>'}
                                            </Button>
                                        </>}
                                    </>
                                </pre>
                            </Segment>
                        </Grid.Row>
                        <Grid.Row>
                            <Segment basic style={{ padding: '0' }}>
                                <Header as='h4' content={t('Skills')} dividing style={{ marginBottom: '10px' }} />
                                {selectedSpecialty.skillIds.map((skill) => <Label key={skill} content={getSkill(skill)?.name} style={{ margin: '0.2rem' }} />)}
                            </Segment>
                        </Grid.Row>
                        <Grid.Row style={{ padding: '0' }}>
                            <Divider />
                            <Header
                                content={t('Educational components') + ':'}
                                size='huge'
                                style={{ padding: '0', color: '#444' }} />
                        </Grid.Row>
                        <Grid.Row>
                            <Segment style={{ height: '30rem', overflowY: 'scroll' }}>
                                <SpecialtyDetailsComponentList />
                            </Segment>
                        </Grid.Row>
                    </Grid>
                </Segment>}
        </>
    )
})