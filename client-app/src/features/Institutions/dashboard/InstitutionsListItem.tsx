import { observer } from 'mobx-react-lite';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Button, Grid, Item, Image, Header, Icon, Container, Segment } from 'semantic-ui-react';
import { Institution } from '../../../app/models/institution';
import { useStore } from '../../../app/stores/store';

interface Props {
    institution: Institution
}

export default observer(function InstitutionsListItem({ institution }: Props) {
    let elements = [];
    for (let i = 1; i <= Math.round(institution.rating); i++) {
        elements.push((<Icon color='yellow' name='star' key={i} />))
    }
    for (let i = 1; i <= 5 - Math.round(institution.rating); i++) {
        elements.push((<Icon color='yellow' name='star outline' key={5 - i + 1} />))
    }

    const { institutionStore } = useStore();
    const isActive = institutionStore.selectedInstitutionIds.includes(institution.id);

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' })

    return (
        <Item style={{ minHeight: 110, paddingTop: 20 }}>
            {isComputerOrTablet &&
                <Grid>
                    <Grid.Column style={{ width: '13rem', minWidth: '13rem' }}>
                        <Segment style={{width: '12rem', height: '12rem', padding: 0, borderRadius: '10px 0 0 0 '}}>
                            <img
                                src={institution.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                                style={{ objectFit: 'cover', height: 'inherit', width: 'inherit', borderRadius: 'inherit' }} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column style={{ width: 'calc(100% - 14rem)' }}>
                        <Grid style={{ width: '100%', padding: '0 0 0 5%' }}>
                            <Grid.Row style={{ paddingBottom: '0' }}>
                                <Header
                                    as={Link}
                                    to={`/institutions/${institution.id}`}
                                    style={{ maxWidth: 'calc(100% - 15rem)' }}>
                                    {institution.name}</Header>
                                <Segment style={{ padding: '0 0 0 3rem', margin: '0', position: 'absolute', right: '0' }} basic>{elements}</Segment>
                            </Grid.Row>
                            <Grid.Row style={{ padding: '0 0 1rem 0' }}>
                                <Item.Meta>{institutionStore.getCityById(institution.cityId, institution.regionId)?.name}, {institution.streetAddress}</Item.Meta>
                            </Grid.Row>
                            <Grid.Row style={{ padding: '0 0 1rem 0' }} >
                                <Button
                                    basic
                                    active={isActive}
                                    className={isActive ? 'customButtonActive' : ''}
                                    style={{ position: 'relative', right: 0, margin: 0, padding: 0, top: 0, border: 'none', width: '3rem', height: '3rem' }}
                                    onClick={() => institutionStore.toggleSelectedInstitutionId(institution.id)}>
                                    <Icon name='plus' size='large' style={{ left: '0.5rem', bottom: '0.05rem', position: 'relative' }} />
                                </Button>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column style={{ width: '100%' }}>
                        <Item.Description>{institution.description.slice(0, 250) + " ..."}</Item.Description>
                    </Grid.Column>
                </Grid>}
            {isMobile &&
                <Grid style={{ margin: 0 }}>
                    <Grid.Row>
                        <Header
                            textAlign='center'
                            as={Link}
                            to={`/institutions/${institution.id}`}
                            style={{ width: '100%' }}>
                            {institution.name}</Header>
                    </Grid.Row>
                    <Grid.Column style={{ width: '12rem', padding: 0 }}>
                        <Image
                            src={institution.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                            style={{ objectFit: 'cover', minHeight: '11rem', minWidth: '11rem', borderRadius: '30px' }} />
                    </Grid.Column>
                    <Grid.Column style={{ width: 'calc(100% - 12rem)' }}>
                        <Grid style={{ width: '100%', margin: 0 }}>
                            <Grid.Row style={{ paddingBottom: '0' }}>
                                <Button
                                    basic
                                    active={isActive}
                                    className={isActive ? 'customButtonActive' : ''}
                                    style={{ position: 'relative', left: 0, margin: '0 1rem 0 0', padding: 0, top: 0, border: 'none', width: '3rem', height: '3rem' }}
                                    onClick={() => institutionStore.toggleSelectedInstitutionId(institution.id)}>
                                    <Icon name='plus' size='large' style={{ left: '0.5rem', bottom: '0.05rem', position: 'relative' }} />
                                </Button>
                                {elements}
                            </Grid.Row>
                            <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                                <Item.Meta>{institutionStore.getCityById(institution.cityId, institution.regionId)?.name}, {institution.streetAddress}</Item.Meta>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Row>
                        <Item.Description>
                            <pre style={{ margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                                {institution.description.slice(0, 250) + " ..."}
                            </pre>
                        </Item.Description>
                    </Grid.Row>
                </Grid>}
        </Item>
    )
})