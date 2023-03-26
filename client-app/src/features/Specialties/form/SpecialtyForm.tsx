import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Divider, DropdownItemProps, DropdownProps, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
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


export default observer(function SpecialtyForm() {

    const { specialtyStore, commonStore, institutionStore } = useStore();
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
        skillsById } = specialtyStore;
    const { setEditMode } = commonStore;
    const { id } = useParams();
    const { id1, id2 } = useParams();
    const { t } = useTranslation();

    const [specialty, setSpecialty] = useState<SpecialtyFormValues>(new SpecialtyFormValues())
    const [specialtyCore, setSpecialtyCore] = useState<SpecialtyCore>(new SpecialtyCore());

    const specialtyOptions: any[] = specialtyCoresById.map(specialty => ({
        text: `${specialty.id} ${specialty.name}`,
        value: specialty.id,
    }));

    const skillOptions: DropdownItemProps[] = skillsById.map(skill => ({
        key: skill.id,
        text: skill.name,
        value: skill.id,
    }));

    const degrees = t("degreeOptions", { returnObjects: true }) as [{ text: string; value: number }]
    const languages = t("languageOptions", { returnObjects: true }) as [{ text: string; value: string }]
    const studyForms = t("studyFormOptions", { returnObjects: true }) as [{ text: string; value: number }]

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    const validationSchema = Yup.object({
        localSpecialtyCode: Yup.string().required(),
        description: Yup.string().required('Specialty description is required'),
        degreeId: Yup.string().required(),
        tuitionUAH: Yup.number().required(),
        freeEducation: Yup.string().required(),
        acceptanceRate: Yup.string().required(),
        graduationRate: Yup.string().required(),
        graduateEmploymentRate: Yup.string().required(),
        undergraduatesEnrolled: Yup.string().required(),
        ectsCredits: Yup.number().required(),
        startYear: Yup.number().required(),
        endYear: Yup.number().required(),
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
    }, [setLoadingInitial, institutionStore.loadInstitution, setSpecialty, setSpecialtyCore, getSpecialtyCore, loadingInitial, setEditMode, id1, id2, loadSpecialty, commonStore, institutionStore])

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

    if (loadingInitial || loading) return (<LoadingComponent content='Loading specialties form...' />)
    return (
        <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={specialty}
            onSubmit={values => handleSpecialtyFormSubmit(values)}>
            {({ handleSubmit, isValid, isSubmitting, dirty, getFieldProps, getFieldHelpers }) => (
                <Form
                    className='ui form'
                    onSubmit={handleSubmit}
                    autoComplete='off'>
                    {isComputerOrTablet &&
                        <Grid style={{ padding: 0, color: '#444', width: '80%', minWidth: '65rem', margin: '0 auto' }}>
                            <Grid.Row style={{ paddingBottom: 0 }}>
                                <Header
                                    size='large'
                                    style={{ color: '#444', width: 'calc(100% - 20rem)' }}>
                                    <CustomSelectInput
                                        onChange={(event, data: DropdownProps) =>
                                            setSpecialtyCore(new SpecialtyCore(getSpecialtyCore(data.value as string)))}
                                        options={specialtyOptions}
                                        placeholder={t('Select specialty')}
                                        name='localSpecialtyCode' />
                                </Header>
                                <Button.Group style={{ width: '16rem', margin: '0 0 0 auto', height: '35px' }}>
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
                                    <Grid.Column width={7}>
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
                                                            color='blue' />
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
                                                            name='tuitionUAH'
                                                            width='7rem' />
                                                        <Label content='UAH' size='large' style={{ position: 'relative', bottom: '-0.6rem' }} /> <br></br>
                                                        {t('Free education available') + ': '}
                                                        <CustomCheckboxInput name='scholarship' /></>} />
                                                <TableItem
                                                    loading={(loading || loadingInitial)}
                                                    icon='flag'
                                                    label={t('Education period')}
                                                    content={
                                                        <>
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
                                                        </>} />
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
                                    <Grid.Column width={6} stretched>
                                        <Segment basic style={{ padding: '0' }}>
                                            <Header as='h4' content={t('Description')} dividing style={{ marginBottom: '0' }} />
                                            <CustomTextArea rows={16} placeholder={t('Description')} name='description' />
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={3} stretched>
                                        <Segment basic style={{ padding: '0' }}>
                                            <Header as='h4' content={t('Skills')} dividing style={{ marginBottom: '5px' }} />
                                            <CustomSelectInput
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
                            </Button.Group>
                            <Grid style={{ padding: 0, color: '#444', margin: 0 }}>
                                <Grid.Row style={{ paddingBottom: 0 }}>
                                    <Header
                                        size='large'
                                        style={{ color: '#444', width: '100%' }}>
                                        <CustomSelectInput
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
                                                    <Label content={`${t('ISCED code')}: ${getSpecialtyCoreISCEDString(specialtyCore.id)}`} />
                                                </Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Icon
                                                        name='book'
                                                        size='big'
                                                        color='blue' />
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
                                                        name='tuitionUAH'
                                                        width='7rem' />
                                                    <Label content='UAH' size='large' style={{ position: 'relative', bottom: '-0.6rem' }} /> <br></br>
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
                                        <CustomTextArea rows={16} placeholder={t('Description')} name='description' />
                                    </Segment>
                                </Grid.Row>
                                <Grid.Row>
                                    <Segment basic style={{ padding: '0' }}>
                                        <Header as='h4' content={t('Skills')} dividing style={{ marginBottom: '5px' }} />
                                        <CustomSelectInput
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
                                    <Segment style={{ height: '30rem', overflowY: 'scroll' }}>
                                        <SpecialtyDetailsComponentList />
                                    </Segment>
                                </Grid.Row>
                            </Grid>
                        </Segment>}
                </Form >
            )}
        </Formik >
    )
})
