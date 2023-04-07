import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Button, Grid, Item, Image, Header, Icon, Segment } from 'semantic-ui-react';
import RatingStars from '../../../app/common/rating/RatingStars';
import { Institution } from '../../../app/models/institution';
import { useStore } from '../../../app/stores/store';

interface Props {
    institution: Institution
}

export default observer(function InstitutionsListItem({ institution }: Props) {
    const { institutionStore } = useStore();
    const isActive = institutionStore.selectedInstitutionIds.includes(institution.id);

    const { t, i18n } = useTranslation();

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' })

    return (
        <>
            {isComputerOrTablet &&
                <Segment style={{ padding: 0, borderRadius: '10px' }}>
                    <Grid style={{ margin: 0 }}>
                        <Grid.Column style={{ width: '13rem', minWidth: '13rem', padding: 0 }}>
                            <img
                                alt='TitleImage'
                                src={institution.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                                style={{ width: '12rem', height: '12rem', borderRadius: '10px 0 0 0 ', objectFit: 'cover' }} />
                        </Grid.Column>
                        <Grid.Column style={{ width: 'calc(100% - 14rem)', paddingRight: 0 }}>
                            <Grid style={{ padding: '0 0 0 0.5rem' }}>
                                <Grid.Row>
                                    <Header
                                        as={Link}
                                        to={`/institutions/${institution.id}`}
                                        style={{ width: '100%' }}>
                                        {institution.name}</Header>
                                </Grid.Row>
                                <Grid.Row style={{ padding: '0 0 1rem 0' }}>
                                    <div style={{ position: 'absolute', right: 0 }}>
                                        <div style={{ display: 'block' }}>
                                            <RatingStars rating={institution.rating} />
                                        </div>
                                        <div style={{ color: '#777', display: 'block', marginLeft: '1rem' }}>
                                            {t('Reviews')} {institution.reviewsCount}
                                        </div>
                                    </div>
                                    <Item.Meta>{institutionStore.getCityById(institution.cityId, institution.regionId)?.name}, {institution.streetAddress}</Item.Meta>
                                </Grid.Row>
                                <Grid.Row style={{ padding: '0 0 1rem 0' }} >
                                    <Button
                                        basic
                                        icon='plus'
                                        label={t('Compare')}
                                        active={isActive}
                                        className={isActive ? 'customButtonActive' : ''}
                                        style={{ width: '3rem', height: '3rem', color: '#444' }}
                                        onClick={() => institutionStore.toggleSelectedInstitutionId(institution.id)} />
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column style={{ width: '100%' }}>
                            <Item.Description>{institution.description.slice(0, 250)}...
                                <Button
                                    as={Link}
                                    to={`/institutions/${institution.id}`}
                                    style={{ border: 0, boxShadow: 'none', padding: 4, fontWeight: 'bold' }}
                                    basic>
                                    {t('Read more')}{'>>'}
                                </Button>
                            </Item.Description>
                        </Grid.Column>
                    </Grid>
                </Segment>}
            {isMobile &&
                <Segment style={{ padding: 0, borderRadius: '10px' }}>
                    <Grid style={{ margin: 0 }}>
                        <Grid.Column style={{ width: '13rem', minWidth: '13rem', padding: 0 }}>
                            <img
                                alt='TitleImage'
                                src={institution.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                                style={{ width: '12rem', height: '12rem', borderRadius: '10px 0 0 0 ', objectFit: 'cover' }} />
                        </Grid.Column>
                        <Grid.Column style={{ width: 'calc(100% - 14rem)' }}>
                            <Grid style={{ width: '100%', padding: '0 0 0 5%' }}>
                                <Grid.Row style={{ padding: 0 }}>
                                    <Header
                                        as={Link}
                                        to={`/institutions/${institution.id}`}
                                        style={{ display: 'block', padding: '0.5rem 0 2rem 0' }}>
                                        {institution.name}</Header>
                                    <div style={{ position: 'relative', right: 0 }}>
                                        <div style={{ display: 'block' }}>
                                            <RatingStars rating={institution.rating} />
                                        </div>
                                        <div style={{ color: '#777', display: 'inline', marginLeft: '1rem' }}>
                                            {t('Reviews')} {institution.reviewsCount}
                                        </div>
                                    </div>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        <Grid.Row>
                            <Button
                                basic
                                icon='plus'
                                label={t('Compare')}
                                active={isActive}
                                className={isActive ? 'customButtonActive' : ''}
                                style={{ height: '3rem', color: '#444' }}
                                onClick={() => institutionStore.toggleSelectedInstitutionId(institution.id)} />
                        </Grid.Row>
                        <Grid.Row>
                            <Item.Description>{institution.description.slice(0, 150)}...
                                <Button
                                    as={Link}
                                    to={`/institutions/${institution.id}`}
                                    style={{ border: 0, boxShadow: 'none', padding: 4, fontWeight: 'bold' }}
                                    basic>
                                    {t('Read more')}{'>>'}
                                </Button>
                            </Item.Description>
                        </Grid.Row>
                        <Grid.Row style={{ color: '#777', padding: '0.2rem' }}>
                            {institutionStore.getCityById(institution.cityId, institution.regionId)?.name}, {institution.streetAddress}
                        </Grid.Row>
                    </Grid>
                </Segment>}
        </>
    )
})