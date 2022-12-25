import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Header, Image, Item, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import InstitutionDetailsInfo from './InstitutionDetailsInfo';
import InstitutionDetailsMenu from './InstitutionDetailsMenu';
import InstitutionDetailsSpecialtiesList from './InstitutionDetailsSpecialtiesList';

export default observer(function InstitutionDetails() {
    const { institutionStore } = useStore();
    const { selectedInstitution: institution, loadingInitial, loadInstitution, detailsMenuActiveItem } = institutionStore;
    const { id } = useParams();
    useEffect(() => {
        if (id) loadInstitution(id);
    }, [loadInstitution, id]);
    if (loadingInitial) return <LoadingComponent />
    if (!institution) return (<></>);
    return (
        <Grid>
            <Grid.Column width={16} style={{ padding: '1rem 0 1rem 0' }}>
                <Segment style={{ top: '-1px', padding: '0' }} basic clearing>
                    <Image src={'/assets/YFCNU.jpg'} fluid style={{ filter: 'brightness(50%)', height: '16em', objectFit: 'cover' }} />
                </Segment>
                <Segment style={{
                    padding: '1em 3em 1em 3em',
                    position: 'absolute',
                    top: '12em',
                    left: '5%',
                    width: '90%',
                    height: 'auto',
                    color: 'white',
                    borderRadius: '0px',
                    boxShadow: 'none',
                    border: 'none'
                }}>
                    <Item.Group>
                        <Item>
                            <Header
                                size='huge'
                                content={institution.name}
                                style={{ color: '#444' }}
                            />
                        </Item>
                        <Item>
                            <InstitutionDetailsMenu />
                        </Item>
                        {detailsMenuActiveItem === 'About' && <Item>
                            <InstitutionDetailsInfo institution={institution}/>
                        </Item>}
                        {detailsMenuActiveItem === 'Specialties' && <Item>
                            <InstitutionDetailsSpecialtiesList />
                        </Item>}
                    </Item.Group>
                </Segment>
            </Grid.Column>
        </Grid>
    )
})