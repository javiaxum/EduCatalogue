import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Grid, Header, Placeholder, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import { InstitutionFormValues } from '../../../app/models/institution';
import { router } from '../../routers/Routes';
import BackgroundUploadWidgetDropzone from '../../../app/common/imageUpload/backgroundImage/BackgroundUploadWidgetDropzone';
import BackgroundImageUploadWidgetCropper from '../../../app/common/imageUpload/backgroundImage/BackgroundImageUploadWidgetCropper';
import InstitutionFormContent from '../details/InstitutionFormContent';

export default observer(function InstitutionForm() {
    const { institutionStore, commonStore } = useStore();
    const {
        loadInstitution,
        loadingInitial,
        loading,
        createInstitution,
        editInstitution,
        setLoadingInitial,
        loadRegionsWithCities,
        selectedInstitution,
        uploading,
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
            let formValues = new InstitutionFormValues(institution);
            setInstitution(formValues)
            setLoadingInitial(false);
        }
        setEditMode(true);

        return (() => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <Grid style={{ margin: 0, minWidth: '70rem', backgroundColor: '#fff' }} stretched>
                        <Grid.Row style={{ padding: 0, zIndex: 1 }}>
                            {loading
                                ? <Placeholder
                                    style={{ filter: 'brightness(80%)', objectFit: 'cover', height: '13rem', minWidth: '100%', overflow: 'hidden', zIndex: -100 }} >
                                    <Placeholder.Image />
                                </Placeholder>
                                : <>
                                    {(files && files.length === 0) &&
                                        <BackgroundUploadWidgetDropzone
                                            setFiles={setFiles}
                                            imageUrl={selectedInstitution?.images.find((x) => x.id === selectedInstitution.backgroundImageId)?.url || '/assets/YFCNU.jpg'} />}
                                    {(files && files.length > 0) &&
                                        <div className='bkgr-img-preview' style={{ filter: 'brightness(80%)', objectFit: 'cover', height: '13rem', minWidth: '100%', overflow: 'hidden', zIndex: -100 }} />}
                                </>}
                        </Grid.Row>
                        <Grid.Row
                            style={{ padding: 0, top: '-4rem' }}>
                            <Segment
                                style={{ margin: 0, padding: '1rem 3rem 0.15rem 3rem', left: '15%', width: '70%', borderRadius: '5px', boxShadow: 'none', border: 'none', zIndex: 2 }}>
                                {(files && files.length > 0) &&
                                    <Segment style={{ padding: '1rem 0 1rem 0' }} clearing>
                                        <Header as='h3' content='Background preview' style={{ paddingLeft: '40px' }} />
                                        <BackgroundImageUploadWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                                        <Button.Group>
                                            <Button
                                                positive
                                                type='button'
                                                icon='check'
                                                onClick={onCrop}
                                                loading={uploading} />
                                            <Button
                                                onClick={() => { files.forEach((file: any) => URL.revokeObjectURL(file.preview)); setFiles([]) }}
                                                type='button'
                                                icon='cancel'
                                                disabled={uploading} />
                                        </Button.Group>
                                    </Segment>}
                                {loading ?
                                    <Placeholder style={{ display: 'inline-block', color: '#444', width: 'calc(100% - 25rem)', height: '2rem' }}>
                                        <Placeholder.Line />
                                    </Placeholder>
                                    : <Header
                                        style={{ display: 'inline-block', color: '#444', width: 'calc(100% - 25rem)', margin: 0 }}>
                                        <CustomTextInput width='100%' placeholder='Name' name='name' />
                                    </Header>}
                                <Button.Group style={{ position: 'absolute', width: '22rem', right: '2rem' }}>
                                    <Button
                                        positive
                                        type='submit'
                                        content='Submit'
                                        loading={isSubmitting}
                                        disabled={!dirty || isSubmitting || !isValid} />
                                    <Button
                                        as={Link}
                                        to={institution.id ? `/institutions/${institution.id}` : '/institutions'}
                                        onClick={() => setEditMode(false)}
                                        floated='right'
                                        type='button'
                                        content='Cancel'
                                        disabled={isSubmitting} />
                                </Button.Group>
                            </Segment>
                            <Segment basic style={{ padding: '0 3rem 0 3rem', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100rem', minWidth: '100rem' }}>
                                <InstitutionFormContent />
                            </Segment>
                        </Grid.Row>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
})