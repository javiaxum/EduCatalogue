import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Grid, Image, Header, Placeholder, Segment } from 'semantic-ui-react';
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
import { ImagesPagingParams, ReviewsPagingParams } from '../../../app/models/pagination';
import RatingStars from '../../../app/common/rating/RatingStars';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

export default observer(function InstitutionForm() {
    const { institutionStore, commonStore, specialtyStore } = useStore();
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
        setBackgroundImage,
        setImagesPagingParams,
        setReviewPagingParams,
        getRegionById,
        clearImages,
        activeMenuItem } = institutionStore;
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

    })
    const { t } = useTranslation();
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    useEffect(() => {
        setEditMode(true);
        if (id)
            loadInstitution(id)
                .then(institution => {
                    let formValues = new InstitutionFormValues(institution);
                    setInstitution(formValues);
                    specialtyStore.loadSpecialties();
                    specialtyStore.loadPopularSpecialties();
                    setReviewPagingParams(new ReviewsPagingParams());
                    if (activeMenuItem !== 'Gallery') {
                        setImagesPagingParams(new ImagesPagingParams());
                        setReviewPagingParams(new ReviewsPagingParams());
                    }
                });
        else {
            let formValues = new InstitutionFormValues(institution);
            setInstitution(formValues)
            setLoadingInitial(false);
        }

        return (() => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files, loadInstitution, id, editMode, setLoadingInitial, setInstitution, setEditMode, loadRegionsWithCities, clearImages])

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
    return (
        <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={institution}
            onSubmit={values => handleInstitutionFormSubmit(values)}>
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    {isComputerOrTablet &&
                        <Grid style={{ margin: 0, backgroundColor: '#fff' }} stretched>
                            <Grid.Row style={{ padding: 0, zIndex: 1 }}>
                                {loading ?
                                    <Placeholder
                                        style={{ filter: 'brightness(80%)', objectFit: 'cover', height: '13rem', minWidth: '100%', overflow: 'hidden', zIndex: -100 }} >
                                        <Placeholder.Image />
                                    </Placeholder> :
                                    <>
                                        {(files && files.length === 0) &&
                                            <BackgroundUploadWidgetDropzone
                                                setFiles={setFiles}
                                                imageUrl={selectedInstitution?.backgroundImageUrl || '/assets/placeholder.png'} />}
                                        {(files && files.length > 0) &&
                                            <div className='bkgr-img-preview' style={{ filter: 'brightness(80%)', objectFit: 'cover', height: '13rem', minWidth: '100%', overflow: 'hidden', zIndex: -100 }} />}
                                    </>}
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0, top: '-4rem' }}>
                                <Segment style={{ margin: 0, padding: '1rem 3rem 1rem 3rem', left: '15%', width: '70%', borderRadius: '5px', boxShadow: 'none', border: 'none', zIndex: 2 }}>
                                    {(files && files.length > 0) &&
                                        <Segment style={{ padding: '1rem 0 1rem 0' }} clearing>
                                            <Header as='h3' content='Background preview' style={{ paddingLeft: '40px' }} />
                                            <BackgroundImageUploadWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                                            <Button.Group fluid>
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
                                        <Placeholder style={{ display: 'inline-block', color: '#444', width: 'calc(100% - 23rem)', height: '6rem' }}>
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                        </Placeholder> :
                                        <div style={{ display: 'inline-block', width: 'calc(100% - 23rem)' }}>
                                            <Header
                                                size='huge'
                                                style={{ color: '#444', margin: 0 }} >
                                                <CustomTextInput fontWeight='600' padding='0.2rem' width='100%' placeholder='Name' name='name' />
                                            </Header>
                                            <div style={{ display: 'block', color: '#888', padding: '0 0 1rem 0' }}>
                                                {getRegionById(selectedInstitution?.regionId!)?.name}, {" "}
                                                {institutionStore.getCityById(selectedInstitution?.cityId!, selectedInstitution?.regionId!)?.name}
                                            </div>
                                            <div style={{ display: 'inline-block' }}>
                                                <RatingStars rating={selectedInstitution?.rating!} />
                                            </div>
                                            <div style={{ display: 'inline-block', marginLeft: '-2.4rem' }}>
                                                {selectedInstitution?.reviewsCount} {t('Reviews_Dashboard_plural')}
                                            </div>
                                        </div>}
                                    <Button.Group style={{ position: 'absolute', width: '22rem', right: '2rem' }}>
                                        <Button
                                            positive
                                            type='submit'
                                            content={t('Submit')}
                                            loading={isSubmitting}
                                            disabled={!dirty || isSubmitting || !isValid} />
                                        <Button
                                            as={Link}
                                            to={institution.id ? `/institutions/${institution.id}` : '/institutions'}
                                            onClick={() => setEditMode(false)}
                                            floated='right'
                                            type='button'
                                            content={t('Cancel')}
                                            disabled={isSubmitting} />
                                    </Button.Group>
                                </Segment>
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0, top: '-4rem' }}>
                                <div style={{ padding: '0 3rem 0 3rem', minHeight: '50rem', marginLeft: 'auto', marginRight: 'auto', maxWidth: '85rem', minWidth: '85rem' }}>
                                    <InstitutionFormContent />
                                </div>
                            </Grid.Row>
                        </Grid>}
                    {isMobile &&
                        <Grid style={{ margin: 0, backgroundColor: '#fff' }}>
                            <Grid.Row style={{ padding: 0, zIndex: 1 }}>
                                {loading
                                    ? <Placeholder
                                        style={{ filter: 'brightness(80%)', objectFit: 'cover', height: '8rem', minWidth: '100%', overflow: 'hidden', zIndex: -100 }} >
                                        <Placeholder.Image />
                                    </Placeholder>
                                    : <Image
                                        src={selectedInstitution?.backgroundImageUrl || '/assets/YFCNU.jpg'}
                                        style={{ filter: 'brightness(80%)', objectFit: 'cover', height: '8rem', minWidth: '100%', overflow: 'hidden', zIndex: -100 }} />}
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0 }}>
                                <div style={{ width: '100%' }}>
                                    <Button.Group style={{ margin: 0 }} attached='bottom'>
                                        <Button
                                            positive
                                            type='submit'
                                            content={t('Submit')}
                                            loading={isSubmitting}
                                            disabled={!dirty || isSubmitting || !isValid} />
                                        <Button
                                            as={Link}
                                            to={institution.id ? `/institutions/${institution.id}` : '/institutions'}
                                            onClick={() => setEditMode(false)}
                                            floated='right'
                                            type='button'
                                            content={t('Cancel')}
                                            disabled={isSubmitting} />
                                    </Button.Group>
                                </div>
                                {loading ?
                                    <Placeholder style={{ display: 'inline-block', color: '#444', width: '100%', height: '6rem' }}>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder> :
                                    <div style={{ display: 'inline-block', width: '100%' }}>
                                        <Header
                                            size='huge'
                                            style={{ color: '#444', margin: 0 }} >
                                            <CustomTextInput fontWeight='600' padding='0.2rem' width='100%' placeholder='Name' name='name' />
                                        </Header>
                                        <div style={{ display: 'block', color: '#888', padding: '0 0 1rem 0' }}>
                                            {getRegionById(selectedInstitution?.regionId!)?.name}, {" "}
                                            {institutionStore.getCityById(selectedInstitution?.cityId!, selectedInstitution?.regionId!)?.name}
                                        </div>
                                        <div style={{ display: 'inline-block' }}>
                                            <RatingStars rating={selectedInstitution?.rating!} />
                                        </div>
                                        <div style={{ display: 'inline-block', marginLeft: '-2.4rem' }}>
                                            {selectedInstitution?.reviewsCount} {t('Reviews_Dashboard_plural')}
                                        </div>
                                    </div>}
                            </Grid.Row>
                            <Grid.Row style={{ padding: 0 }}>
                                <div style={{ padding: isComputerOrTablet ? '0 3rem 0 3rem' : 0, minHeight: '50rem', marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
                                    <InstitutionFormContent />
                                </div>
                            </Grid.Row>
                        </Grid>}
                </Form>)
            }
        </Formik >
    )
})