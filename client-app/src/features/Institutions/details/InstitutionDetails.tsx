import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Header, Image, Placeholder, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InstitutionDetailsContent from './InstitutionDetailsContent';
import { useMediaQuery } from 'react-responsive';
import { ImagesPagingParams, ReviewsPagingParams, SpecialtiesPagingParams } from '../../../app/models/pagination';
import RatingStars from '../../../app/common/rating/RatingStars';
import { Breadcrumbs, Link as MLink } from '@mui/material';

export default observer(function InstitutionDetails() {
    const { institutionStore, commonStore, profileStore, specialtyStore } = useStore();
    const {
        loadInstitution,
        loading,
        clearImages,
        clearReviews,
        selectedInstitution,
        isInstitutionManager,
        setReviewPagingParams,
        getRegionById,
        loadImages,
        loadReviews,
        clearSelectedInstitution,
        setSelectedInstitutionId } = institutionStore;
    const { editMode, setEditMode } = commonStore;
    const { id } = useParams();
    const [loadingInitial, setLoadingInitial] = useState(true);
    const isActive = institutionStore.selectedInstitutionIds.includes(id!);

    useEffect(() => {
        clearImages(); clearSelectedInstitution(); clearReviews();
        if (id) {
            setSelectedInstitutionId(id);
            setReviewPagingParams(new ReviewsPagingParams());
            specialtyStore.setPagingParams(new SpecialtiesPagingParams());
            Promise.all([
                specialtyStore.loadSpecialties(id),
                specialtyStore.loadPopularSpecialties(id),
                loadImages(),
                loadReviews(),
                loadInstitution(id)]).then(() => setLoadingInitial(false))
        }
        setEditMode(false);
        return () => { clearImages(); clearSelectedInstitution(); clearReviews(); }
    }, []);

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });
    const regionsToExclude = [1, 2, 27];
    const { t } = useTranslation();

    const regionName = getRegionById(selectedInstitution?.regionId!)?.name;
    const cityName = institutionStore.getCityById(selectedInstitution?.cityId!, selectedInstitution?.regionId!)?.name;

    return (
        <>
            {isComputerOrTablet &&
                <Grid style={{ margin: 0, minWidth: '85rem', backgroundColor: '#fff' }}>
                    <Grid.Row style={{ padding: 0, zIndex: 1 }}>
                        {loading ?
                            <Placeholder
                                style={{ filter: 'brightness(80%)', objectFit: 'cover', height: '13rem', minWidth: '100%', overflow: 'hidden', zIndex: -100 }} >
                                <Placeholder.Image />
                            </Placeholder> :
                            <Image
                                src={selectedInstitution?.backgroundImageUrl || '/assets/placeholder.png'}
                                style={{ filter: 'brightness(80%)', objectFit: 'cover', height: '13rem', minWidth: '100%', overflow: 'hidden', zIndex: -100 }} />}
                    </Grid.Row>
                    <Grid.Row style={{ padding: 0, top: '-4rem' }}>
                        <Segment style={{ margin: 0, padding: '1rem 3rem 1rem 3rem', left: '15%', width: '70%', borderRadius: '5px', boxShadow: 'none', border: 'none', zIndex: 2 }}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link
                                    to="/institutions">
                                    {t('Search')}
                                </Link>
                                <Link
                                    to={`/institutions/${selectedInstitution?.id}`}>
                                    {t('Institution')}
                                </Link>
                            </Breadcrumbs>
                            {loading ?
                                <Placeholder style={{ display: 'inline-block', color: '#444', width: '100%', height: '5rem', maxWidth: '100%' }}>
                                    <Placeholder.Line />
                                </Placeholder> :
                                <div style={{ display: 'inline-block', width: '100%' }}>
                                    <Header
                                        size='huge'
                                        content={selectedInstitution?.name}
                                        style={{ color: '#444', margin: 0 }} />
                                    {regionName && cityName &&
                                        <div style={{ display: 'block', color: '#888', padding: '0 0 1rem 0' }}>
                                            {regionName}
                                            {regionsToExclude.includes(selectedInstitution?.regionId!) ? "" : ", " + cityName}
                                        </div>}
                                    {selectedInstitution?.rating && selectedInstitution.reviewsCount &&
                                        <>
                                            <div style={{ display: 'inline-block' }}>
                                                <RatingStars rating={selectedInstitution.rating} />
                                            </div>
                                            <div style={{ display: 'inline-block', marginLeft: '-2.4rem' }}>
                                                {t('Reviews')} {selectedInstitution.reviewsCount}
                                            </div>
                                        </>}
                                    <Button.Group style={{ float: 'right', width: 'fit-content', bottom: '1rem' }}>
                                        {(profileStore.isOperator && !selectedInstitution?.approved && !loadingInitial && !loading) &&
                                            <Button
                                                type='button'
                                                positive
                                                onClick={() => institutionStore.approveChanges(id!)}>
                                                {t('Approve changes')}
                                            </Button>}
                                        {(isInstitutionManager || profileStore.isOperator) &&
                                            <Button
                                                onClick={() => commonStore.setEditMode(!commonStore.editMode)}
                                                as={Link}
                                                floated='right'
                                                to={`/manage/${selectedInstitution?.id}`}
                                                content={t('Manage Institution')} />}
                                    </Button.Group>
                                    {id &&
                                        <Button
                                            basic
                                            active={isActive}
                                            icon='plus'
                                            label={t('Compare')}
                                            className={isActive ? 'customButtonActive' : ''}
                                            style={{ color: '#444', float: 'right', width: 'fit-content', bottom: '1rem' }}
                                            onClick={() => institutionStore.toggleSelectedInstitutionId(id)} />}
                                </div>}
                        </Segment>
                    </Grid.Row>
                    <Grid.Row style={{ padding: 0, top: '-4rem' }}>
                        <div style={{ padding: '0 3rem 0 3rem', minHeight: '50rem', marginLeft: 'auto', marginRight: 'auto', maxWidth: '85rem', minWidth: '85rem' }}>
                            <InstitutionDetailsContent />
                        </div>
                    </Grid.Row>
                </Grid >}
            {isMobile &&
                <Grid style={{ margin: 0, backgroundColor: '#fff' }}>
                    <Grid.Row style={{ padding: 0 }}>
                        {(isInstitutionManager || profileStore.isOperator) &&
                            <Button
                                onClick={() => setEditMode(!editMode)}
                                attached='top'
                                as={Link}
                                style={{ zIndex: 500, width: '100%', opacity: 0.5 }}
                                to={`/manage/${selectedInstitution?.id}`}
                                content={t('Manage Institution')} />}
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem' }}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                to="/institutions">
                                {t('Search')}
                            </Link>
                            <Link
                                to={`/institutions/${selectedInstitution?.id}`}>
                                {t('Institution')}
                            </Link>
                        </Breadcrumbs>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '0 0.5rem' }}>
                        {loading ?
                            <Placeholder style={{ height: '5rem', width: '100%', maxWidth: '100%' }}>
                                <Placeholder.Line style={{ width: '100%' }} />
                            </Placeholder>
                            : <>
                                <Header
                                    textAlign='center'
                                    size='huge'
                                    content={selectedInstitution?.name}
                                    style={{ color: '#444', margin: 0 }} />
                                <Grid style={{ margin: 0, padding: '1rem', width: '100%' }}>
                                    {selectedInstitution?.rating && selectedInstitution.reviewsCount &&
                                        <Grid.Column style={{ width: '10rem', padding: 0 }}>
                                            <RatingStars rating={selectedInstitution.rating} />
                                            {t('Reviews')} {selectedInstitution.reviewsCount}
                                        </Grid.Column>}
                                    {regionName && cityName &&
                                        <Grid.Column floated='right' style={{ width: 'fit-content', color: '#888', padding: '0 0 1rem 0' }}>
                                            {regionName}
                                            {regionsToExclude.includes(selectedInstitution?.regionId!) ? "" : ", " + cityName}
                                        </Grid.Column>}
                                </Grid>
                            </>}

                    </Grid.Row>
                    <Grid.Row style={{ padding: '0' }}>
                        <div style={{ padding: isComputerOrTablet ? '0 3rem 0 3rem' : 0, minHeight: '50rem', marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
                            <InstitutionDetailsContent />
                        </div>
                    </Grid.Row>
                </Grid>}
        </>
    )
})  