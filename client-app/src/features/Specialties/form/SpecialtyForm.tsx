import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Divider, DropdownItemProps, DropdownProps, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import { SpecialtyFormValues } from '../../../app/models/specialty';
import { router } from '../../routers/Routes';
import SpecialtyDetailsComponentList from '../details/educationalComponent/SpecialtyDetailsComponentList';
import CustomSelectInput from '../../../app/common/form/CustomSelectInput';
import CustomCheckboxInput from '../../../app/common/form/CustomCheckboxInput';
import { SpecialtyCore } from '../../../app/models/specialtyCore';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import TableItem from '../../Institutions/details/TableItem';
import ConfirmDeleteSpecialty from '../../Institutions/details/specialties/ConfirmDeleteSpecialty';
import { Breadcrumbs, Link as MLink } from '@mui/material';

export default observer(function SpecialtyForm() {

    const { specialtyStore, commonStore, institutionStore, modalStore, profileStore } = useStore();
    const {
        loadSpecialty,
        createSpecialty,
        editSpecialty,
        getSpecialtyCore,
        getBranch,
        loading,
        loadingInitial,
        setLoadingInitial,
        getSpecialtyCoreISCEDString,
        specialtyCoresById,
        skillsById,
        toggleVisibility,
        selectedSpecialty } = specialtyStore;
    const { setEditMode } = commonStore;
    const { id } = useParams();
    const { id1, id2 } = useParams();
    const { t, i18n } = useTranslation();

    const [specialty, setSpecialty] = useState<SpecialtyFormValues>(new SpecialtyFormValues())
    const [specialtyCore, setSpecialtyCore] = useState<SpecialtyCore>(new SpecialtyCore());
    const [specialtyOptions, setSpecialtyOptions] = useState<any[]>(specialtyCoresById.map(specialty => ({
        text: `${specialty.id} ${specialty.name}`,
        value: specialty.id,
    })));
    const [skillOptions, setSkillOptions] = useState<DropdownItemProps[]>(skillsById.map(skill => ({
        key: skill.id,
        text: skill.name,
        value: skill.id,
    })));

    const degrees = t("degreeOptions", { returnObjects: true }) as [{ text: string; value: number }]
    const languages = t("languageOptions", { returnObjects: true }) as [{ text: string; value: string }]
    const studyForms = t("studyFormOptions", { returnObjects: true }) as [{ text: string; value: number }]

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    const validationSchema = Yup.object({
        localSpecialtyCode: Yup.string().required(`${t('Choose specialty')}`),
        description: Yup.string().required(`${t('Description is a required field')}`),
        degreeId: Yup.number().required(`${t('Degree is a required field')}`)
            .min(1, `${t('Invalid degree')}`)
            .max(3, `${t('Invalid degree')}`),
        tuitionUSD: Yup.number().required(`${t('Tuition is a required field')}`),
        acceptanceRate: Yup.number().required(`${t('Acceptance rate is a required field')}`)
            .min(0, `${t('The value should not be less than')} 0`)
            .max(100, `${t('The value should not exceed')} 100`),
        graduationRate: Yup.number().required(`${t('Graduation rate is a required field')}`)
            .min(0, `${t('The value should not be less than')} 0`)
            .max(100, `${t('The value should not exceed')} 100`),
        graduateEmploymentRate: Yup.number().required(`${t('Graduate employment rate is a required field')}`)
            .min(0, `${t('The value should not be less than')} 0`)
            .max(100, `${t('The value should not exceed')} 100`),
        undergraduatesEnrolled: Yup.number().required(`${t('Enrolled undergraduates is a required field')}`)
            .min(0, `${t('The value should not be less than')} 0`)
            .max(10000000, `${t('The value should not exceed')} 10000000`),
        startYear: Yup.number().required(`${t('Start year is a required field')}`)
            .min(2019, `${t('Enrollment should not be earlier than of 2019')}`)
            .max(2050, `${t('Enrollment should not be later than of 2050')}`),
        endYear: Yup.number().required(`${t('End year undergraduates is a required field')}`)
            .min(Yup.ref('startYear'), `${t('Graduation year should not be less than the year of enrollment')}`)
            .max(2050, `${t('Graduation should not be later than of 2050')}`),
        studyFormIds: Yup.array().min(1, "Specify at least a single study form"),
        languageIds: Yup.array().min(1, "Specify at least a single language"),
        skillIds: Yup.array().min(1, "Specify at least a single skill"),
        componentDTOs: Yup.array().min(1, "Specify at least a single component"),
    })

    useEffect(() => {
        if (id2) {
            loadSpecialty(id2)
                .then(specialty => {
                    setSpecialty(new SpecialtyFormValues(specialty));
                    setSpecialtyCore(new SpecialtyCore(getSpecialtyCore(specialty?.localSpecialtyCode!)!));
                });
            if (id1 === 'undefined') {
                router.navigate(`/institutions`);
            }
            else if (id1) institutionStore.loadInstitution(id1);
        }
        setLoadingInitial(false);
        setEditMode(true);
    }, [])

    function handleSpecialtyFormSubmit(specialty: SpecialtyFormValues) {
        if (id) {
            specialty.id = uuid();
            createSpecialty(specialty, id).then(() => {
                router.navigate(`/specialties/${specialty.id}`)
            });
        } else if (id1 && id2) {
            editSpecialty(specialty).then(() => {
                router.navigate(`/specialties/${id2}`)
            });
        }
    }

    return (
        <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={specialty}
            onSubmit={values => handleSpecialtyFormSubmit(values)}>
            {({ handleSubmit, isValid, isSubmitting, dirty, getFieldProps, getFieldHelpers, values }) => (
                <Form
                    className='ui form'
                    onSubmit={handleSubmit}
                    autoComplete='off'>
                    {isComputerOrTablet &&
                        <Grid style={{ padding: 0, color: '#444', width: '80%', minWidth: '65rem', margin: '0 auto' }}>
                            <Grid.Row style={{ padding: '0 1rem 0 1rem' }}>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link
                                        to="/institutions">
                                        {t('Search')}
                                    </Link>
                                    <Link
                                        to={`/institutions/${specialty.institutionId}`}>
                                        {t('Institution')}
                                    </Link>
                                    <Link
                                        to={`/specialties/${specialty?.id}`}>
                                        {t('Specialty')} {specialty?.localSpecialtyCode ? specialty?.localSpecialtyCode : ''}
                                    </Link>
                                </Breadcrumbs>
                            </Grid.Row>
                            <Grid.Row style={{ padding: '0 1rem 0 1rem' }}>
                                <Header
                                    size='medium'
                                    style={{ color: '#444', width: 'calc(100% - 37rem)' }}>
                                    <CustomSelectInput
                                        padding='0.2rem'
                                        loading={(loading || loadingInitial)}
                                        onChange={(event, data: DropdownProps) =>
                                            setSpecialtyCore(new SpecialtyCore(getSpecialtyCore(data.value as string)))}
                                        options={specialtyOptions}
                                        placeholder={t('Select specialty')}
                                        name='localSpecialtyCode' />
                                </Header>
                                <Button.Group style={{ width: '37rem', margin: '0 0 0 auto', height: '35px' }}>
                                    {specialty.id && <Button
                                        negative
                                        style={{ width: '3rem' }}
                                        size='large'
                                        type='button'
                                        onClick={() => modalStore.openModalMini(<ConfirmDeleteSpecialty id={specialty.id!} />)} >
                                        <Icon name='trash' style={{ position: 'relative', bottom: '0.2rem', right: '0.5rem' }} />
                                    </Button>}
                                    <Button
                                        type='button'
                                        loading={loading}
                                        onClick={() => toggleVisibility(selectedSpecialty?.id!).then(() => getFieldHelpers('visibility').setValue(!selectedSpecialty?.visible))}>
                                        <Icon name={selectedSpecialty?.visible ? 'eye slash' : 'eye'} />
                                        {t(selectedSpecialty?.visible ? 'Hide specialty' : 'Show specialty')}
                                    </Button>
                                    <Button
                                        positive
                                        type='submit'
                                        content={t('Submit')}
                                        loading={isSubmitting}
                                        disabled={!dirty || isSubmitting || !isValid} />
                                    <Button
                                        as={Link}
                                        to={specialty.id ? `/specialties/${specialty.id}` : `/institutions/${id}`}
                                        onClick={() => setEditMode(false)}
                                        type='button'
                                        content={t('Cancel')}
                                        disabled={isSubmitting} />
                                </Button.Group>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid style={{ width: '100%' }}>
                                    <Grid.Column width={8}>
                                        <Table basic='very' compact>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        <Label content={`${t('ISCED code')}: ${getSpecialtyCoreISCEDString(specialtyCore.id)}`} />
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        <Icon
                                                            name='book'
                                                            size='big'
                                                            style={{ color: 'rgb(38, 94, 213)' }} />
                                                        {t('Knowledge branch')}: {specialtyCore.id && specialtyCore.id.slice(0, 2)} {specialtyCore.id && getBranch(specialtyCore.id.slice(0, 2))?.name}
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
                                                    content={
                                                        <CustomSelectInput
                                                            width='14rem'
                                                            options={degrees}
                                                            placeholder={t('Degree')}
                                                            name='degreeId' />} />
                                                <TableItem
                                                    loading={(loading || loadingInitial)}
                                                    icon='clock'
                                                    label={t('ECTS credits')}
                                                    content={
                                                        <CustomTextInput
                                                            min={0}
                                                            max={2000}
                                                            width='7rem'
                                                            type='number'
                                                            placeholder={t('ECTS credits')}
                                                            name='ectsCredits' />} />
                                                <TableItem
                                                    loading={(loading || loadingInitial)}
                                                    icon='dollar'
                                                    label={t('Tuition')}
                                                    content={<>
                                                        <CustomTextInput
                                                            min={0}
                                                            max={10000000}
                                                            type='number'
                                                            placeholder='0'
                                                            name='tuitionUSD'
                                                            width='7rem' />
                                                        <Label content='USD' size='large' style={{ position: 'relative', bottom: '-0.6rem' }} /> <br></br>
                                                        {t('Free education available') + ': '}
                                                        <CustomCheckboxInput name='scholarship' /></>} />
                                                <TableItem
                                                    loading={(loading || loadingInitial)}
                                                    icon='flag'
                                                    label={t('Education period')}
                                                    content={
                                                        <>
                                                            <CustomTextInput
                                                                min={2019}
                                                                max={2050}
                                                                width='7rem'
                                                                type='number'
                                                                placeholder='0'
                                                                name='startYear' />
                                                            <Label basic content='-' size='large' style={{ position: 'relative', bottom: '-0.6rem' }} />
                                                            <CustomTextInput
                                                                min={2019}
                                                                max={2050}
                                                                width='7rem'
                                                                type='number'
                                                                placeholder='0'
                                                                name='endYear' />
                                                        </>} />
                                                <TableItem
                                                    loading={(loading || loadingInitial)}
                                                    icon='user'
                                                    label={t('Enrolled students count')}
                                                    content={
                                                        <CustomTextInput
                                                            min={0}
                                                            width='7rem'
                                                            type='number'
                                                            placeholder={t('Undergraduates enrolled')}
                                                            name='undergraduatesEnrolled' />} />
                                                <TableItem
                                                    loading={(loading || loadingInitial)}
                                                    icon='percent'
                                                    label={t('Acceptance rate')}
                                                    content={
                                                        <>
                                                            <CustomTextInput
                                                                min={0}
                                                                max={100}
                                                                width='5.5rem'
                                                                type='number'
                                                                placeholder={t('Specify rate in percents')}
                                                                name='acceptanceRate' />
                                                            <Label content='%' size='large' style={{ position: 'relative', bottom: '-0.6rem' }} />
                                                        </>} />
                                                <TableItem
                                                    loading={(loading || loadingInitial)}
                                                    icon='percent'
                                                    label={t('Graduation rate')}
                                                    content={
                                                        <>
                                                            <CustomTextInput
                                                                min={0}
                                                                max={100}
                                                                width='5.5rem'
                                                                type='number'
                                                                placeholder={t('Specify rate in percents')}
                                                                name='graduationRate' />
                                                            <Label content='%' size='large' style={{ position: 'relative', bottom: '-0.6rem' }} />
                                                        </>} />
                                                <TableItem
                                                    loading={(loading || loadingInitial)}
                                                    icon='percent'
                                                    label={t('Graduate employment rate')}
                                                    content={
                                                        <>
                                                            <CustomTextInput
                                                                min={0}
                                                                max={100}
                                                                width='5.5rem'
                                                                type='number'
                                                                placeholder={t('Specify rate in percents')}
                                                                name='graduateEmploymentRate' />
                                                            <Label content='%' size='large' style={{ position: 'relative', bottom: '-0.6rem' }} />
                                                        </>
                                                    } />
                                                <TableItem
                                                    loading={(loading || loadingInitial)}
                                                    icon='language'
                                                    label={t('Language')}
                                                    content={
                                                        <CustomSelectInput
                                                            width='18rem'
                                                            options={languages}
                                                            placeholder={t('Education language')}
                                                            name='languageIds'
                                                            multiple={true} />} />
                                                <TableItem
                                                    loading={(loading || loadingInitial)}
                                                    icon='address book'
                                                    label={t('Study form')}
                                                    content={
                                                        <CustomSelectInput
                                                            width='18rem'
                                                            options={studyForms}
                                                            placeholder={t('Study forms')}
                                                            name='studyFormIds'
                                                            multiple={true} />} />
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                    <Grid.Column width={5} stretched>
                                        <Segment basic style={{ padding: '0' }}>
                                            <Header as='h4' content={t('Description')} dividing style={{ marginBottom: '0' }} />
                                            <CustomTextArea rows={32} placeholder={t('Description')} name='description' loading={(loading || loadingInitial)} />
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={3} stretched>
                                        <Segment basic style={{ padding: '0' }}>
                                            <Header as='h4' content={t('Skills')} dividing style={{ marginBottom: '5px' }} />
                                            <CustomSelectInput
                                                loading={(loading || loadingInitial)}
                                                options={skillOptions}
                                                name='skillIds'
                                                multiple
                                                placeholder={t('Select skill')} />
                                        </Segment>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Row>
                            <Grid.Row>
                                <Header
                                    content={t('Educational components') + ":"}
                                    size='huge'
                                    style={{ color: '#444', margin: 0 }} />
                            </Grid.Row>
                            <Grid.Row>
                                <SpecialtyDetailsComponentList />
                            </Grid.Row>
                        </Grid>}
                    {isMobile &&
                        <Segment basic style={{ width: '90%', padding: 0, margin: '0 auto' }}>
                            <Button.Group attached='bottom' style={{ width: '16rem', margin: '1rem 0', height: '35px' }}>
                                <Button
                                    positive
                                    type='submit'
                                    content={t('Submit')}
                                    loading={isSubmitting}
                                    disabled={!dirty || isSubmitting || !isValid} />
                                <Button
                                    as={Link}
                                    to={specialty.id ? `/specialties/${specialty.id}` : `/institutions/${id}`}
                                    onClick={() => setEditMode(false)}
                                    type='button'
                                    content={t('Cancel')}
                                    disabled={isSubmitting} />
                                <Button
                                    negative
                                    style={{ maxWidth: '3rem' }}
                                    size='large'
                                    type='button'
                                    onClick={() => modalStore.openModalMini(<ConfirmDeleteSpecialty id={specialty.id!} />)} >
                                    <Icon name='trash' style={{ position: 'relative', bottom: '0.2rem', right: '0.5rem' }} />
                                </Button>
                            </Button.Group>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link
                                    to="/institutions">
                                    {t('Search')}
                                </Link>
                                <Link
                                    to={`/institutions/${specialty.institutionId}`}>
                                    {t('Institution')}
                                </Link>
                                <Link
                                    to={`/specialties/${specialty?.id}`}>
                                    {t('Specialty')} {specialty?.localSpecialtyCode ? specialty?.localSpecialtyCode : ''}
                                </Link>
                            </Breadcrumbs>
                            <Grid style={{ padding: 0, color: '#444', margin: 0 }}>
                                <Grid.Row style={{ paddingBottom: 0 }}>
                                    <Header
                                        size='large'
                                        style={{ color: '#444', width: '100%' }}>
                                        <CustomSelectInput
                                            loading={(loading || loadingInitial)}
                                            onChange={(event, data: DropdownProps) =>
                                                setSpecialtyCore(new SpecialtyCore(getSpecialtyCore(data.value as string)))}
                                            options={specialtyOptions}
                                            placeholder={t('Select specialty')}
                                            name='localSpecialtyCode' />
                                    </Header>
                                </Grid.Row>
                                <Grid.Row style={{ paddingTop: 0 }}>
                                    <Table basic='very' compact unstackable>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>
                                                    {specialtyCore && <>
                                                        <Label style={{ margin: '0.1rem' }}>
                                                            {t('ISCED code')}: {i18n.language === 'uk' ? getSpecialtyCoreISCEDString(specialtyCore.id!) : ''}
                                                        </Label>
                                                        {i18n.language !== 'uk' && specialtyCore.iscedCores.map((i) => <Label key={i.id} style={{ margin: '0.1rem' }} content={i.id + " " + i.name} />)}
                                                    </>}
                                                </Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Icon
                                                        name='book'
                                                        size='big'
                                                        style={{ color: 'rgb(38, 94, 213)' }} />
                                                    {t('Knowledge branch')}: {specialtyCore.id && specialtyCore.id.slice(0, 2)} {specialtyCore.id && getBranch(specialtyCore.id.slice(0, 2))?.name}
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
                                                content={
                                                    <CustomSelectInput
                                                        width='12rem'
                                                        options={degrees}
                                                        placeholder={t('Degree')}
                                                        name='degreeId' />} />
                                            <TableItem
                                                loading={(loading || loadingInitial)}
                                                icon='clock'
                                                label={t('ECTS credits')}
                                                content={
                                                    <CustomTextInput
                                                        min={0}
                                                        max={1000}
                                                        width='7rem'
                                                        type='number'
                                                        placeholder={t('ECTS credits')}
                                                        name='ectsCredits' />} />
                                            <TableItem
                                                loading={(loading || loadingInitial)}
                                                icon='dollar'
                                                label={t('Tuition')}
                                                content={<>
                                                    <CustomTextInput
                                                        type='number'
                                                        placeholder='0'
                                                        name='tuitionUSD'
                                                        width='7rem' />
                                                    <Label content='USD' size='large' style={{ position: 'relative', bottom: '-0.6rem' }} /> <br></br>
                                                    {t('Free education available') + ': '}
                                                    <CustomCheckboxInput name='scholarship' /></>} />
                                            <TableItem
                                                loading={(loading || loadingInitial)}
                                                icon='flag'
                                                label={t('Education period')}
                                                content={
                                                    <div style={{ width: '10rem' }}>
                                                        <CustomTextInput
                                                            width='7rem'
                                                            type='number'
                                                            placeholder='0'
                                                            name='startYear' />
                                                        <Label basic content='-' size='large' style={{ position: 'relative', bottom: '-0.6rem' }} />
                                                        <CustomTextInput
                                                            width='7rem'
                                                            type='number'
                                                            placeholder='0'
                                                            name='endYear' />
                                                    </div>} />
                                            <TableItem
                                                loading={(loading || loadingInitial)}
                                                icon='user'
                                                label={t('Enrolled students count')}
                                                content={
                                                    <CustomTextInput
                                                        width='7rem'
                                                        type='number'
                                                        placeholder={t('Undergraduates enrolled')}
                                                        name='undergraduatesEnrolled' />} />
                                            <TableItem
                                                loading={(loading || loadingInitial)}
                                                icon='percent'
                                                label={t('Acceptance rate')}
                                                content={
                                                    <>
                                                        <CustomTextInput
                                                            width='5.5rem'
                                                            type='number'
                                                            placeholder={t('Specify rate in percents')}
                                                            name='acceptanceRate' />
                                                        <Label content='%' size='large' style={{ position: 'relative', bottom: '-0.6rem' }} />
                                                    </>} />
                                            <TableItem
                                                loading={(loading || loadingInitial)}
                                                icon='percent'
                                                label={t('Graduation rate')}
                                                content={
                                                    <>
                                                        <CustomTextInput
                                                            width='5.5rem'
                                                            type='number'
                                                            placeholder={t('Specify rate in percents')}
                                                            name='graduationRate' />
                                                        <Label content='%' size='large' style={{ position: 'relative', bottom: '-0.6rem' }} />
                                                    </>} />
                                            <TableItem
                                                loading={(loading || loadingInitial)}
                                                icon='percent'
                                                label={t('Graduate employment rate')}
                                                content={
                                                    <>
                                                        <CustomTextInput
                                                            width='5.5rem'
                                                            type='number'
                                                            placeholder={t('Specify rate in percents')}
                                                            name='graduateEmploymentRate' />
                                                        <Label content='%' size='large' style={{ position: 'relative', bottom: '-0.6rem' }} />
                                                    </>
                                                } />
                                            <TableItem
                                                loading={(loading || loadingInitial)}
                                                icon='language'
                                                label={t('Language')}
                                                content={
                                                    <CustomSelectInput
                                                        width='12rem'
                                                        options={languages}
                                                        placeholder={t('Education language')}
                                                        name='languageIds'
                                                        multiple={true} />} />
                                            <TableItem
                                                loading={(loading || loadingInitial)}
                                                icon='address book'
                                                label={t('Study form')}
                                                content={
                                                    <CustomSelectInput
                                                        width='12rem'
                                                        options={studyForms}
                                                        placeholder={t('Study forms')}
                                                        name='studyFormIds'
                                                        multiple={true} />} />
                                        </Table.Body>
                                    </Table>
                                </Grid.Row>
                                <Grid.Row>
                                    <Segment basic style={{ padding: '0', width: '100%' }}>
                                        <Header as='h4' content={t('Description')} dividing style={{ marginBottom: '0' }} />
                                        <CustomTextArea loading={(loading || loadingInitial)} rows={16} placeholder={t('Description')} name='description' />
                                    </Segment>
                                </Grid.Row>
                                <Grid.Row>
                                    <Segment basic style={{ padding: '0' }}>
                                        <Header as='h4' content={t('Skills')} dividing style={{ marginBottom: '5px' }} />
                                        <CustomSelectInput
                                            loading={(loading || loadingInitial)}
                                            options={skillOptions}
                                            name='skillIds'
                                            multiple
                                            placeholder={t('Select skill')} />
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
                                    <Segment style={{ height: '30rem', width: '100%', overflowY: 'scroll' }}>
                                        <SpecialtyDetailsComponentList />
                                    </Segment>
                                </Grid.Row>
                            </Grid>
                        </Segment>}
                </Form >)}
        </Formik >
    )
})
