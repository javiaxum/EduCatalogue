import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Header, Image, Item, Placeholder, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import InstitutionDetailsInfo from './InstitutionDetailsInfo';
import InstitutionDetailsMenu from './InstitutionDetailsMenu';
import InstitutionDetailsSpecialtiesList from './specialties/InstitutionDetailsSpecialtiesList';
import { Link } from 'react-router-dom';
import InstitutionDetailsReviewsList from './reviews/InstitutionDetailsReviewsList';
import InstitutionDetailsGallery from './gallery/InstitutionDetailsGallery';
import InstitutionDetailsLocation from './location/InstitutionDetailsLocation';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

export default observer(function InstitutionDetails() {
    const { institutionStore, commonStore, profileStore, specialtyStore } = useStore();
    const {
        loadInstitution,
        detailsMenuActiveItem,
        loading,
        selectedInstitution,
        isInstitutionManager } = institutionStore;
    const { editMode, setEditMode } = commonStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadInstitution(id).then(() => specialtyStore.loadSpecialties())
        setEditMode(false);
    }, [loadInstitution, id]);

    const { t } = useTranslation();

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    return (
        <Grid style={{ margin: 0, minWidth: '70rem' }}>
            <Grid.Row style={{ padding: 0 }}>
                {loading
                    ? <Placeholder
                        style={{ filter: 'brightness(80%)', objectFit: 'cover', height: '13rem', minWidth: '100%', overflow: 'hidden', zIndex: -100 }} >
                        <Placeholder.Image />
                    </Placeholder>
                    : <Image
                        src={selectedInstitution?.images.find((x) => x.id === selectedInstitution.backgroundImageId)?.url || '/assets/YFCNU.jpg'}
                        style={{ filter: 'brightness(80%)', objectFit: 'cover', height: '13rem', minWidth: '100%', overflow: 'hidden', zIndex: -100 }} />}
            </Grid.Row>
            <Grid.Row
                style={{ padding: 0, top: '-4rem' }}>
                <Segment
                    style={{ padding: '1rem 3rem 1rem 3rem', left: '15%', width: '70%', color: 'white', borderRadius: '5px', boxShadow: 'none', border: 'none', }}>
                    {loading ?
                        <Placeholder style={{ display: 'inline-block', color: '#444', width: 'calc(100% - 13rem)', height: '2rem' }}>
                            <Placeholder.Line />
                        </Placeholder>
                        : <Header
                            size='huge'
                            content={selectedInstitution?.name}
                            style={{ display: 'inline-block', color: '#444', width: 'calc(100% - 13rem)', margin: 0 }} />}
                    {isInstitutionManager || profileStore.isOperator &&
                        <Button
                            onClick={() => setEditMode(!editMode)}
                            as={Link}
                            floated='right'
                            to={`/manage/${selectedInstitution?.id}`}
                            style={{ display: 'inline-block', width: '12rem' }}
                            content={t('Manage Institution')} />}
                </Segment>
                <Segment basic style={{padding: '0 3rem 0 3rem'}}>
                    <InstitutionDetailsMenu />
                    {detailsMenuActiveItem === 'About' &&
                        <InstitutionDetailsInfo />}
                    {detailsMenuActiveItem === 'Specialties' &&
                        <InstitutionDetailsSpecialtiesList />}
                    {detailsMenuActiveItem === 'Reviews' &&
                        <InstitutionDetailsReviewsList />}
                    {detailsMenuActiveItem === 'Location' &&
                        <InstitutionDetailsLocation />}
                    {detailsMenuActiveItem === 'Gallery' &&
                        <InstitutionDetailsGallery />}
                </Segment>
            </Grid.Row>
            {specialtyStore.selectedSpecialtyIds.length > 0 &&
                <Button
                    color='facebook'
                    size='huge'
                    as={Link}
                    to='/specialties/comparison'
                    style={{ position: 'fixed', right: '10rem', bottom: '1rem', zIndex: 1000 }}>
                    Compare {specialtyStore.selectedSpecialtyIds.length} specialties
                </Button>}
        </Grid>
    )
})  