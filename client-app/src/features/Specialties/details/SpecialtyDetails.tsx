import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Link, useParams } from 'react-router-dom';
import { Button, Divider, Grid, Header, Icon, Label, Placeholder, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import TableItem from '../../Institutions/details/TableItem';
import SpecialtyDetailsComponentList from './educationalComponent/SpecialtyDetailsComponentList';
import { Breadcrumbs, Link as MLink } from '@mui/material';

export default observer(function SpecialtyDetails() {
    const { specialtyStore, commonStore, institutionStore, profileStore } = useStore()
    const { selectedSpecialty, loadSpecialty, loading, getSpecialtyCore, getBranch, getSkill, getSpecialtyCoreISCEDString } = specialtyStore;
    const { setEditMode } = commonStore;
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const [descriptionOpened, setDescriptionOpened] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);

    useEffect(() => {
        setLoadingInitial(false)
    }, [])
    useEffect(() => {
        if (id) loadSpecialty(id);
        setEditMode(false);
    }, [loadSpecialty, selectedSpecialty, id, setEditMode]);

    const degrees = t("degreeOptions", { returnObjects: true }) as [{ text: string; value: number }]
    const languages = t("languageOptions", { returnObjects: true }) as [{ text: string; value: string }]
    const studyForms = t("studyFormOptions", { returnObjects: true }) as [{ text: string; value: number }]

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    const specialtyLanguages = selectedSpecialty?.languageIds.map((i) => languages[i === "en" ? 0 : 1 as number]?.text).join(", ");
    const specialtyStudyForms = selectedSpecialty?.studyFormIds.map((i) => studyForms[i - 1]?.text).join(", ");

    const specialtyCoreString = getSpecialtyCore(selectedSpecialty?.localSpecialtyCode!)?.name || '';
    const isActive = specialtyStore.selectedSpecialtyIds.includes(id!);

    return (
        <>
            {isComputerOrTablet &&
                <Grid style={{ padding: 0, color: '#444', minWidth: '65rem', width: '80%', margin: '0 auto' }}>
                    <Grid.Row>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                to="/institutions">
                                {t('Search')}
                            </Link>
                            <Link
                                to={`/institutions/${selectedSpecialty?.institutionId}`}>
                                {t('Institution')}
                            </Link>
                            <Link
                                to={`/specialties/${selectedSpecialty?.id}`}>
                                {t('Specialty')} {selectedSpecialty?.localSpecialtyCode ? selectedSpecialty?.localSpecialtyCode : ''}
                            </Link>
                        </Breadcrumbs>
                    </Grid.Row>
                    <Grid.Row>
                        <Header
                            size='large'
                            style={{ margin: '0', height: '35px', color: '#444', width: 'calc(100% - 25rem)' }}>
                            {(loading || loadingInitial) ?
                                <Placeholder>
                                    <Placeholder.Line />
                                </Placeholder> :
                                <Label
                                    size='big'
                                    content={`${selectedSpecialty?.localSpecialtyCode} ${specialtyCoreString}`}
                                    style={{ padding: '0.5rem' }} />}
                        </Header>
                        <Button.Group style={{ width: '20rem', margin: '0 0 0 auto', height: '35px' }}>
                            {(profileStore.isOperator && !selectedSpecialty?.approved && !loadingInitial && !loading) &&
                                <Button
                                    type='button'
                                    positive
                                    onClick={() => specialtyStore.approveChanges(id!)}>
                                    {t('Approve changes')}
                                </Button>}
                            {(institutionStore.isInstitutionManager || profileStore.isOperator) && <Button
                                onClick={() => commonStore.setEditMode(true)}
                                as={Link}
                                to={`/manage/${selectedSpecialty?.institutionId}/specialty/${selectedSpecialty?.id}`}
                                content={t('Edit specialty')}
                            />}
                        </Button.Group>
                    </Grid.Row>
                    <Grid.Row>
                        {id &&
                            <Button
                                basic
                                active={isActive}
                                icon='plus'
                                label={t('Compare')}
                                className={isActive ? 'customButtonActive' : ''}
                                style={{ width: '3rem', height: '3rem', color: '#444' }}
                                onClick={() => specialtyStore.toggleSelectedSpecialtyId(id)} />}
                        <Grid style={{ width: '100%' }}>
                            <Grid.Column width={7}>
                                <Table basic='very' compact>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                {(loading || loadingInitial) ?
                                                    <Placeholder>
                                                        <Placeholder.Line />
                                                    </Placeholder> :
                                                    <>
                                                        <Label style={{ margin: '0.1rem' }}>
                                                            {t('ISCED code')}: {i18n.language === 'uk' ? getSpecialtyCoreISCEDString(selectedSpecialty?.localSpecialtyCode!) : ''}
                                                        </Label>
                                                        {i18n.language !== 'uk' && getSpecialtyCore(selectedSpecialty?.localSpecialtyCode!)?.iscedCores.map((i) => <Label key={i.id} style={{ margin: '0.1rem' }} content={i.id + " " + i.name} />)}
                                                    </>}
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>
                                                {(loading || loadingInitial) ?
                                                    <Placeholder>
                                                        <Placeholder.Line />
                                                    </Placeholder> :
                                                    <>
                                                        <Icon
                                                            name='book'
                                                            size='big'
                                                            style={{ color: 'rgb(38, 94, 213)' }} />
                                                        {t('Knowledge branch')}: {selectedSpecialty?.localSpecialtyCode.slice(0, 2)} {getBranch('' + selectedSpecialty?.localSpecialtyCode.slice(0, 2))?.name}
                                                    </>}
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
                                            content={degrees[(selectedSpecialty?.degreeId || 1) - 1].text} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='clock'
                                            label={t('ECTS credits')}
                                            content={selectedSpecialty?.ectsCredits} />
                                        {selectedSpecialty?.tuitionUAH && <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='dollar'
                                            label={t('Tuition')}
                                            content={<>{Math.round(selectedSpecialty?.tuitionUAH / 100)}00 UAH<br></br>
                                                {selectedSpecialty?.freeEducation && <Label content={t('Free education available')} />}</>} />}
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='flag'
                                            label={t('Education period')}
                                            content={selectedSpecialty?.startYear + ' - ' + selectedSpecialty?.endYear} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='user'
                                            label={t('Enrolled students count')}
                                            content={selectedSpecialty?.undergraduatesEnrolled} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='percent'
                                            label={t('Acceptance rate')}
                                            content={selectedSpecialty?.acceptanceRate + '%'} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='percent'
                                            label={t('Graduation rate')}
                                            content={selectedSpecialty?.graduationRate + '%'} />
                                        <TableItem
                                            loading={(loading || loadingInitial)}
                                            icon='percent'
                                            label={t('Graduate employment rate')}
                                            content={selectedSpecialty?.graduateEmploymentRate + '%'} />
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
                                    {(loading || loadingInitial) ?
                                        <Placeholder style={{ width: '100%' }}>
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                        </Placeholder> :
                                        <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                                            <>
                                                {selectedSpecialty?.description.slice(0, descriptionOpened ? 6000 : 400)}
                                                {(!descriptionOpened && (selectedSpecialty?.description?.length || 0) > 400) && <>...
                                                    <Button
                                                        type='button'
                                                        basic
                                                        size='small'
                                                        onClick={() => setDescriptionOpened(true)}>
                                                        {t('Read more') + '>>'}
                                                    </Button>
                                                </>}
                                            </>
                                        </pre>}
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={3} stretched>
                                <Segment basic style={{ padding: '0' }}>
                                    <Header as='h4' content={t('Skills')} dividing style={{ marginBottom: '10px' }} />
                                    {(loading || loadingInitial) ?
                                        <Placeholder style={{ width: '100%' }}>
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                        </Placeholder> :
                                        <>
                                            {selectedSpecialty?.skillIds.map((skill) => <Label key={skill} content={getSkill(skill)?.name} style={{ margin: '0.2rem' }} />)}
                                        </>}
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
                    {(institutionStore.isInstitutionManager || profileStore.isOperator) &&
                        <Button
                            attached='bottom'
                            onClick={() => commonStore.setEditMode(true)}
                            as={Link}
                            to={`/manage/${selectedSpecialty?.institutionId}/specialty/${selectedSpecialty?.id}`}
                            content={t('Edit specialty')} />}
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            to="/institutions">
                            {t('Search')}
                        </Link>
                        <Link
                            to={`/institutions/${selectedSpecialty?.institutionId}`}>
                            {t('Institution')}
                        </Link>
                        <Link
                            to={`/specialties/${selectedSpecialty?.id}`}>
                            {t('Specialty')} {selectedSpecialty?.localSpecialtyCode ? selectedSpecialty?.localSpecialtyCode : ''}
                        </Link>
                    </Breadcrumbs>
                    <Grid style={{ padding: 0, color: '#444', margin: 0 }}>
                        <Grid.Row style={{ paddingBottom: 0 }}>
                            {(loading || loadingInitial || !specialtyCoreString) ?
                                <Placeholder style={{ height: '35px', width: '100%' }}>
                                    <Placeholder.Line />
                                </Placeholder> :
                                <Header
                                    size='large'
                                    style={{ margin: '0', height: '35px' }}>
                                    <Label
                                        size='big'
                                        content={`${selectedSpecialty?.localSpecialtyCode} ${specialtyCoreString}`}
                                        style={{ padding: '0.5rem' }} />
                                </Header>}
                        </Grid.Row>
                        <Grid.Row style={{ paddingTop: 0 }}>
                            <Table basic='very' compact>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            {(loading || loadingInitial) ?
                                                <Placeholder>
                                                    <Placeholder.Line />
                                                </Placeholder> :
                                                <>
                                                    <Label style={{ margin: '0.1rem' }}>
                                                        {t('ISCED code')}: {i18n.language === 'uk' ? getSpecialtyCoreISCEDString(selectedSpecialty?.localSpecialtyCode!) : ''}
                                                    </Label>
                                                    {i18n.language !== 'uk' && getSpecialtyCore(selectedSpecialty?.localSpecialtyCode!)?.iscedCores.map((i) => <Label key={i.id} style={{ margin: '0.1rem' }} content={i.id + " " + i.name} />)}
                                                </>}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            {(loading || loadingInitial) ?
                                                <Placeholder>
                                                    <Placeholder.Line />
                                                </Placeholder> :
                                                <>
                                                    <Icon
                                                        name='book'
                                                        size='big'
                                                        style={{ color: 'rgb(38, 94, 213)' }} />
                                                    {t('Knowledge branch')}: {selectedSpecialty?.localSpecialtyCode.slice(0, 2)} {getBranch('' + selectedSpecialty?.localSpecialtyCode.slice(0, 2))?.name}
                                                </>}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            {id &&
                                <Button
                                    basic
                                    active={isActive}
                                    icon='plus'
                                    label={t('Compare')}
                                    className={isActive ? 'customButtonActive' : ''}
                                    style={{ width: '100%', height: '3rem', color: '#444' }}
                                    onClick={() => specialtyStore.toggleSelectedSpecialtyId(id)} />}
                            <Table basic='very' compact unstackable>
                                <Table.Body>
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='graduation'
                                        label={t('Degree')}
                                        content={degrees[(selectedSpecialty?.degreeId || 1) - 1].text} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='clock'
                                        label={t('ECTS credits')}
                                        content={selectedSpecialty?.ectsCredits} />
                                    {selectedSpecialty?.tuitionUAH && <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='dollar'
                                        label={t('Tuition')}
                                        content={<>{Math.round(selectedSpecialty?.tuitionUAH / 100)}00 UAH<br></br>
                                            {selectedSpecialty?.freeEducation && <Label content={t('Free education available')} />}</>} />}
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='flag'
                                        label={t('Education period')}
                                        content={selectedSpecialty?.startYear + ' - ' + selectedSpecialty?.endYear} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='user'
                                        label={t('Enrolled students count')}
                                        content={selectedSpecialty?.undergraduatesEnrolled} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='percent'
                                        label={t('Acceptance rate')}
                                        content={selectedSpecialty?.acceptanceRate + '%'} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='percent'
                                        label={t('Graduation rate')}
                                        content={selectedSpecialty?.graduationRate + '%'} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='percent'
                                        label={t('Graduate employment rate')}
                                        content={selectedSpecialty?.graduateEmploymentRate + '%'} />
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
                            <Segment basic style={{ padding: '0', width: '100%' }}>
                                <Header as='h4' content={t('Description')} dividing style={{ marginBottom: '10px' }} />
                                {(loading || loadingInitial) ?
                                    <Placeholder style={{ width: '100%' }}>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder> :
                                    <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                                        <>
                                            {selectedSpecialty?.description.slice(0, descriptionOpened ? 6000 : 400)}
                                            {(!descriptionOpened && (selectedSpecialty?.description?.length || 0) > 400) && <>...
                                                <Button
                                                    type='button'
                                                    basic
                                                    size='small'
                                                    onClick={() => setDescriptionOpened(true)}>
                                                    {t('Read more') + '>>'}
                                                </Button>
                                            </>}
                                        </>
                                    </pre>}
                            </Segment>
                        </Grid.Row>
                        <Grid.Row>
                            <Segment basic style={{ padding: '0', width: '100%' }}>
                                <Header as='h4' content={t('Skills')} dividing style={{ marginBottom: '10px' }} />
                                {(loading || loadingInitial) ?
                                    <Placeholder>
                                        <Placeholder.Line />
                                    </Placeholder> :
                                    <>
                                        {selectedSpecialty?.skillIds.map((skill) => <Label key={skill} content={getSkill(skill)?.name} style={{ margin: '0.2rem' }} />)}
                                    </>}
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
                            <Segment style={{ height: '30rem', width: '100%', padding: 0, overflowY: 'scroll' }}>
                                <SpecialtyDetailsComponentList />
                            </Segment>
                        </Grid.Row>
                    </Grid>
                </Segment>}
        </>
    )
})