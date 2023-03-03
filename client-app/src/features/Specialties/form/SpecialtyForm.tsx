import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Checkbox, Divider, DropdownProps, Grid, Header, Icon, Label, Segment } from 'semantic-ui-react';
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


export default observer(function SpecialtyForm() {

    const { specialtyStore, commonStore, institutionStore } = useStore();
    const {
        loadSpecialty,
        createSpecialty,
        editSpecialty,
        getSpecialtyCore,
        getBranch,
        getSpecialty,
        loading,
        loadingInitial,
        setLoadingInitial,
        getSpecialtyCoreISCEDString,
        specialtyCoresById } = specialtyStore;
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

    const validationSchema = Yup.object({
        localSpecialtyCode: Yup.string().required(),
        description: Yup.string().required('Specialty description is required'),
        degree: Yup.string().required(),
        ectsCredits: Yup.number().required(),
        priceUAH: Yup.number().required(),
        nonPaidEducationAvailable: Yup.string().required(),
        startYear: Yup.number().required(),
        endYear: Yup.number().required(),
    })


    useEffect(() => {
        if (id2) {
            loadSpecialty(id2)
                .then(specialty => {
                    setSpecialty(new SpecialtyFormValues(specialty));
                    setSpecialtyCore(new SpecialtyCore(getSpecialtyCore(specialty?.localSpecialtyCode!)!));
                });
            if (id1) institutionStore.loadInstitution(id1);
            if (id1 === 'undefined') {
                router.navigate(`/institutions`);
            }
        }
        setLoadingInitial(false);
        setEditMode(true);
    }, [setLoadingInitial, institutionStore.loadInstitution, setSpecialty, setSpecialtyCore, getSpecialtyCore, loadingInitial, setEditMode, id1, id2, loadSpecialty])

    function handleSpecialtyFormSubmit(specialty: SpecialtyFormValues) {
        if (id) {
            specialty.id = uuid();
            createSpecialty(specialty, id).then(() => {
                institutionStore.setSpecialty(getSpecialty(specialty.id!)!, id);
                router.navigate(`/specialties/${specialty.id}`)
            });
        } else if (id1 && id2) {
            editSpecialty(specialty, id1).then(() => {
                institutionStore.setSpecialty(getSpecialty(specialty.id!)!, id1);
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
            onSubmit={values => handleSpecialtyFormSubmit(values)}
        >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form
                    className='ui form'
                    onSubmit={handleSubmit}
                    autoComplete='off'>
                    <Segment basic style={{ width: '80%', minWidth: '1200px', marginLeft: '10%' }}>
                        <Grid style={{ padding: '20px 0 0 0', color: '#444' }}>
                            <Grid.Row style={{ height: '63px' }}>
                                <Header
                                    size='large'
                                    style={{ margin: '0', height: '35px' }}>
                                    {t('Code and specialty')}:
                                </Header>
                                <CustomSelectInput
                                    onChange={(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
                                        setSpecialtyCore(new SpecialtyCore(getSpecialtyCore(data.value as string)));
                                    }}
                                    options={specialtyOptions}
                                    placeholder={t('Select specialty')}
                                    name='localSpecialtyCode' />
                                <Button.Group style={{ width: '16rem', margin: '0 0 0 auto', height: '35px' }}>
                                    <Button
                                        positive
                                        type='submit'
                                        content={t('Submit')}
                                        loading={isSubmitting}
                                        disabled={!dirty || isSubmitting || !isValid}
                                    />
                                    <Button
                                        as={Link}
                                        to={specialty.id ? `/specialties/${specialty.id}` : `/institutions/${id}`}
                                        onClick={() => setEditMode(false)}
                                        type='button'
                                        content={t('Cancel')}
                                        disabled={isSubmitting}
                                    />
                                </Button.Group>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid style={{ width: '100%' }}>
                                    <Grid.Column width={6}>
                                        <Segment.Group style={{ boxShadow: 'none' }}>
                                            <Segment>
                                                <Label
                                                    content={`${t('ISCED code')}: ${getSpecialtyCoreISCEDString(specialtyCore.id)}`}
                                                />
                                            </Segment>
                                            <Segment>
                                                <Icon
                                                    name='graduation'
                                                    size='big'
                                                    color='blue' />
                                                {t('Degree')}:
                                                <CustomSelectInput
                                                    width='14rem'
                                                    options={t("degreeOptions", { returnObjects: true })}
                                                    placeholder={t('Degree')}
                                                    name='degree' />
                                            </Segment>
                                            <Segment basic>
                                                <Icon
                                                    name='clock'
                                                    size='big'
                                                    color='blue' />
                                                {t('ECTS credits')}:
                                                <CustomTextInput
                                                    type='number'
                                                    placeholder={t('ECTS credits')}
                                                    name='ectsCredits' />
                                            </Segment>
                                            <Segment basic>
                                                <Icon
                                                    name='book'
                                                    size='big'
                                                    color='blue' />
                                                {t('Knowledge branch')}: {specialtyCore.id && specialtyCore.id.slice(0, 2)} {specialtyCore.id && getBranch(specialtyCore.id.slice(0, 2))?.name}
                                            </Segment>
                                            <Segment basic>
                                                <Icon
                                                    name='dollar'
                                                    size='big'
                                                    color='blue' />
                                                {t('Full price')}: <CustomTextInput type='number' placeholder='0' name='priceUAH' padding='0.4em 0.2em 0.4em 0.2em' /> UAH <br></br>
                                                {t('Non paid education is available') + ': '}
                                                <CustomCheckboxInput name='nonPaidEducationAvailable' />
                                            </Segment>
                                            <Segment basic>
                                                <Icon
                                                    name='flag'
                                                    size='big'
                                                    color='blue' />
                                                {t('Education period')}:
                                                <CustomTextInput
                                                    width='7rem'
                                                    type='number'
                                                    placeholder='0'
                                                    name='startYear' />
                                                {' - '} <CustomTextInput
                                                    width='7rem'
                                                    type='number'
                                                    placeholder='0'
                                                    name='endYear' />
                                            </Segment>
                                        </Segment.Group>
                                    </Grid.Column>
                                    <Grid.Column width={8} stretched>
                                        <Segment style={{ boxShadow: 'none', padding: '30px' }}>
                                            <Header as='h4' content={t('Description')} dividing style={{ marginBottom: '0' }} />
                                            <CustomTextArea rows={4} placeholder={t('Description')} name='description' />
                                        </Segment>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Row>
                            <Grid.Row>
                                <Divider />
                                <Header
                                    content={`Educational components:`}
                                    size='huge'
                                    style={{ padding: '0 0 10px 0', color: '#444' }} />
                            </Grid.Row>
                            <Grid.Row>
                                <SpecialtyDetailsComponentList />
                            </Grid.Row>
                        </Grid>
                    </Segment >
                </Form >
            )}
        </Formik >
    )
})
