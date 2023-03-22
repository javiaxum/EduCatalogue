import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Header, Image, Placeholder, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InstitutionDetailsContent from './InstitutionDetailsContent';
import { useMediaQuery } from 'react-responsive';
import { ImagesPagingParams, ReviewsPagingParams } from '../../../app/models/pagination';
import RatingStars from '../../../app/common/rating/RatingStars';

export default observer(function InstitutionDetails() {
    const { institutionStore, commonStore, profileStore, specialtyStore } = useStore();
    const {
        loadInstitution,
        loading,
        selectedInstitution,
        isInstitutionManager,
        setReviewPagingParams,
        setImagesPagingParams,
        getRegionById,
        getCityById } = institutionStore;
    const { editMode, setEditMode } = commonStore;
    const { id } = useParams();

    useEffect(() => {
        setImagesPagingParams(new ImagesPagingParams(1));
        setReviewPagingParams(new ReviewsPagingParams(1));
        if (id) loadInstitution(id).then(() => {
            specialtyStore.loadSpecialties();
            specialtyStore.loadPopularSpecialties();
        })
        setEditMode(false);
    }, [loadInstitution, id, setEditMode, specialtyStore, institutionStore, institutionStore.setReviewPagingParams, setImagesPagingParams, setReviewPagingParams]);

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    const { t } = useTranslation();

    return (
        <>
            {isComputerOrTablet && <Grid style={{ margin: 0, minWidth: '85rem', backgroundColor: '#fff' }}>
                <Grid.Row style={{ padding: 0, zIndex: 1 }}>
                    {loading
                        ? <Placeholder
                            style={{ filter: 'brightness(80%)', objectFit: 'cover', height: '13rem', minWidth: '100%', overflow: 'hidden', zIndex: -100 }} >
                            <Placeholder.Image />
                        </Placeholder>
                        : <Image
                            src={selectedInstitution?.backgroundImageUrl || '/assets/placeholder.png'}
                            style={{ filter: 'brightness(80%)', objectFit: 'cover', height: '13rem', minWidth: '100%', overflow: 'hidden', zIndex: -100 }} />}
                </Grid.Row>
                <Grid.Row style={{ padding: 0, top: '-4rem' }}>
                    <Segment
                        style={{ margin: 0, padding: '1rem 3rem 1rem 3rem', left: '15%', width: '70%', borderRadius: '5px', boxShadow: 'none', border: 'none', zIndex: 2 }}>
                        {loading ?
                            <Placeholder style={{ display: 'inline-block', color: '#444', width: 'calc(100% - 13rem)', height: '2rem' }}>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder>
                            : <div style={{ display: 'inline-block', width: 'calc(100% - 13rem)' }}>
                                <Header
                                    size='huge'
                                    content={selectedInstitution?.name}
                                    style={{ color: '#444', margin: 0 }} />
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
                        {(isInstitutionManager || profileStore.isOperator) &&
                            <Button
                                onClick={() => setEditMode(!editMode)}
                                as={Link}
                                floated='right'
                                to={`/manage/${selectedInstitution?.id}`}
                                style={{ display: 'inline-block', width: '12rem' }}
                                content={t('Manage Institution')} />}
                    </Segment>
                </Grid.Row>
                <Grid.Row style={{ padding: 0, top: '-4rem' }}>
                    <div style={{ padding: '0 3rem 0 3rem', marginLeft: 'auto', marginRight: 'auto', maxWidth: '85rem', minWidth: '85rem' }}>
                        <InstitutionDetailsContent />
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
                    <Grid.Row
                        style={{ padding: 0 }}>
                        {(isInstitutionManager || profileStore.isOperator) && false &&
                            <Button
                                onClick={() => setEditMode(!editMode)}
                                attached='top'
                                as={Link}
                                style={{ zIndex: 100, width: '100%', opacity: 0.5 }}
                                to={`/manage/${selectedInstitution?.id}`}
                                content={t('Manage Institution')} />}
                        <Segment
                            style={{ margin: 0, padding: 0, borderRadius: '5px', boxShadow: 'none', border: 'none' }}>

                            {loading ?
                                <Placeholder style={{ color: '#444', height: '2rem' }}>
                                    <Placeholder.Line />
                                </Placeholder>
                                : <Header
                                    textAlign='center'
                                    size='huge'
                                    content={selectedInstitution?.name}
                                    style={{ color: '#444', margin: 0 }} />}

                        </Segment>
                        <div style={{ padding: '0 3rem 0 3rem', marginLeft: 'auto', marginRight: 'auto' }}>
                            <InstitutionDetailsContent />
                        </div>
                    </Grid.Row>
                </Grid>}
        </>
    )
})  