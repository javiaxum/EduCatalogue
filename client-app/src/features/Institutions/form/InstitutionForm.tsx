import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Dimmer, Grid, Header, Image, Item, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import { Institution, InstitutionFormValues } from '../../../app/models/institution';
import { router } from '../../routers/Routes';
import InstitutionDetailsMenu from '../details/InstitutionDetailsMenu';
import InstitutionDetailsSpecialtiesList from '../details/specialties/InstitutionDetailsSpecialtiesList';
import InstitutionDetailsInfoForm from './InstitutionDetailsInfoForm';
import InstitutionDetailsReviewsList from '../details/reviews/InstitutionDetailsReviewsList';
import InstitutionDetailsGallery from '../details/gallery/InstitutionDetailsGallery';
import BackgroundUploadWidgetDropzone from '../../../app/common/imageUpload/backgroundImage/BackgroundUploadWidgetDropzone';
import BackgroundImageUploadWidgetCropper from '../../../app/common/imageUpload/backgroundImage/BackgroundImageUploadWidgetCropper';
import InstitutionDetailsLocationForm from '../details/location/InstitutionDetailsLocationForm';

export default observer(function InstitutionForm() {
    const { institutionStore, commonStore } = useStore();
    const {
        loadInstitution,
        loadingInitial,
        getCityById,
        getRegionById,
        createInstitution,
        editInstitution,
        setLoadingInitial,
        detailsMenuActiveItem,
        loading,
        loadRegionsWithCities,
        selectedInstitution,
        uploading,
        regionRegistry,
        setBackgroundImage } = institutionStore;
    const { id } = useParams();
    const { editMode, setEditMode } = commonStore;

    const [institution, setInstitution] = useState<InstitutionFormValues>(new InstitutionFormValues())
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function HandleImageUpload(file: Blob) {
        if (id)
            setBackgroundImage(file, id).then(() => {
                files.forEach((file: any) => URL.revokeObjectURL(file.preview));
                setFiles([]);
            })
    }

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => HandleImageUpload(blob!))
        }
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Institution name is required'),
        description: Yup.string().required('Institution description is required'),
        streetAddress: Yup.string().required(),
        siteURL: Yup.string().required(),
        regionId: Yup.string().required(),
        cityId: Yup.string().required(),
        contactInformation: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadInstitution(id)
            .then(institution => {
                let formValues = new InstitutionFormValues(institution);
                setInstitution(formValues);
            });
        else {
            console.log('SET')
            let formValues = new InstitutionFormValues(institution);
            setInstitution(formValues)
            setLoadingInitial(false);
        }
        setEditMode(true);

        return (() => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        })
    }, [files, loadInstitution, id, editMode, setLoadingInitial, setInstitution, setEditMode, loadRegionsWithCities])

    function handleInstitutionFormSubmit(institution: InstitutionFormValues) {
        if (!institution.id) {
            institution.id = uuid();
            createInstitution(institution).then(() =>
                router.navigate(`/institutions/${institution.id}`));
        } else {
            editInstitution(institution).then(() =>
                router.navigate(`/institutions/${institution.id}`));
        }
    }
    if (loadingInitial) return <LoadingComponent content='Loading institution form...' />

    return (
        <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={institution}
            onSubmit={values => handleInstitutionFormSubmit(values)}>
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Grid style={{ minWidth: '1000px' }}>
                        <Grid.Column width={16} style={{ padding: '1rem 0 1rem 0' }}>
                            <Segment style={{ top: '-1px', padding: '0' }} basic clearing>
                                {files && files.length == 0 && <BackgroundUploadWidgetDropzone
                                    setFiles={setFiles}
                                    imageUrl={selectedInstitution?.images.find((x) => x.id === selectedInstitution.backgroundImageId)?.url || '/assets/YFCNU.jpg'} />}
                                {files && files.length > 0 && <>
                                    <div className='bkgr-img-preview' style={{ height: '224px', overflow: 'hidden' }} />
                                </>}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={16} style={{ padding: '1rem 0 1rem 0' }}>
                            <Segment style={{
                                padding: '1em 3em 1em 3em',
                                top: '-5em',
                                left: '15%',
                                width: '70%',
                                height: 'auto',
                                color: 'white',
                                borderRadius: '0px',
                                boxShadow: 'none',
                                border: 'none',
                                minWidth: '70vh'
                            }}>
                                {files && files.length > 0 &&
                                    <Segment style={{ padding: '1rem 0 1rem 0' }} clearing>
                                        <Header as='h3' content='Background preview' style={{ paddingLeft: '40px' }} />
                                        <BackgroundImageUploadWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                                        <Button.Group widths={2}>
                                            <Button
                                                positive
                                                type='button'
                                                icon='check'
                                                onClick={onCrop}
                                                loading={uploading}
                                            />
                                            <Button
                                                onClick={() => { files.forEach((file: any) => URL.revokeObjectURL(file.preview)); setFiles([]) }}
                                                type='button'
                                                icon='cancel'
                                                disabled={uploading}
                                            />
                                        </Button.Group>
                                    </Segment>}
                                <Item.Group>
                                    <Item>
                                        <Item.Content>
                                            <Header
                                                style={{ color: '#444', width: '60%', fontSize: '1rem' }}>
                                                <CustomTextInput placeholder='Name' name='name' />
                                            </Header>
                                            <Button.Group floated='right' style={{ minWidth: '10%', maxWidth: '30%' }} >
                                                <Button
                                                    positive
                                                    type='submit'
                                                    content='Submit'
                                                    loading={isSubmitting}
                                                    disabled={!dirty || isSubmitting || !isValid}
                                                />
                                                <Button
                                                    as={Link}
                                                    to={institution.id ? `/institutions/${institution.id}` : '/institutions'}
                                                    onClick={() => setEditMode(false)}
                                                    floated='right'
                                                    type='button'
                                                    content='Cancel'
                                                    disabled={isSubmitting} />
                                            </Button.Group>
                                        </Item.Content>
                                    </Item>
                                </Item.Group>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column style={{ minWidth: '1000px', width: '70%', left: '15%', top: '-80px' }}>
                            <InstitutionDetailsMenu />
                            {detailsMenuActiveItem === 'About' &&
                                <InstitutionDetailsInfoForm institution={institution} />}
                            {detailsMenuActiveItem === 'Specialties' &&
                                <InstitutionDetailsSpecialtiesList />}
                            {detailsMenuActiveItem === 'Location' &&
                                <InstitutionDetailsLocationForm />}
                            {detailsMenuActiveItem === 'Reviews' &&
                                <InstitutionDetailsReviewsList />}
                            {detailsMenuActiveItem === 'Gallery' &&
                                <InstitutionDetailsGallery />}
                        </Grid.Column>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})