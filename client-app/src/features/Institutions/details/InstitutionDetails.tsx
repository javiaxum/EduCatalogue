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

export default observer(function InstitutionDetails() {
    const { institutionStore, commonStore, profileStore, mapStore } = useStore();
    const {
        loadInstitution,
        detailsMenuActiveItem,
        loading,
        selectedInstitution,
        isInstitutionManager } = institutionStore;
    const { editMode, setEditMode } = commonStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadInstitution(id);
        setEditMode(false);
    }, [loadInstitution, id]);

    const { t } = useTranslation();

    return (
        <Grid style={{ minWidth: '1000px' }}>
            <Grid.Column width={16} style={{ padding: '1rem 0 1rem 0' }}>
                <Segment style={{ top: '-1px', padding: '0' }} basic clearing>
                    {loading
                        ? <Placeholder style={{ filter: 'brightness(80%)', height: '224px', objectFit: 'cover', minWidth: '100vw', width: '100%' }}>
                            <Placeholder.Image />
                        </Placeholder>
                        : <Image
                            src={selectedInstitution?.images.find((x) => x.id === selectedInstitution.backgroundImageId)?.url || '/assets/YFCNU.jpg'}
                            style={{ filter: 'brightness(80%)', height: '224px', objectFit: 'cover', minWidth: '1000px', width: '100%', overflow: 'hidden' }} />}

                </Segment>
                <Segment style={{
                    padding: '1em 3em 1em 3em',
                    top: '-4em',
                    left: '15%',
                    width: '70%',
                    height: 'auto',
                    color: 'white',
                    borderRadius: '0px',
                    boxShadow: 'none',
                    border: 'none',
                    minWidth: '70vh'
                }}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                {loading
                                    ? <Placeholder>
                                        <Placeholder.Header>
                                            <Placeholder.Line />
                                        </Placeholder.Header>
                                    </Placeholder>
                                    : <Header
                                        size='huge'
                                        content={selectedInstitution?.name}
                                        style={{ color: '#444', width: 'calc(100% - 14rem)' }}
                                    />}
                                {isInstitutionManager || profileStore.isOperator &&
                                    <Button
                                        onClick={() => setEditMode(!editMode)}
                                        as={Link}
                                        to={`/manage/${selectedInstitution?.id}`}
                                        floated='right'
                                        style={{ width: '12rem' }}
                                        content={t('Manage Institution')}
                                    />}
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Grid.Column>
            <Grid.Column style={{ minWidth: '1000px', width: '70%', left: '15%', top: '-80px' }}>
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
            </Grid.Column>
        </Grid>
    )
})  