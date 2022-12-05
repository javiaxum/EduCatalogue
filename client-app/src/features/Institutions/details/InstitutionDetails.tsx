import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function InstitutionDetails() {
    const { institutionStore } = useStore();
    const { selectedInstitution: institution, loadingInitial, loadInstitution } = institutionStore;
    const { id } = useParams();
    useEffect(() => {
        if (id) loadInstitution(id);
    }, [loadInstitution, id]);
    if (loadingInitial) return <LoadingComponent />
    if (!institution) return (<></>);
    return (
        <Card fluid>
            <Image src={`/assets/institutionTitleImagePlaceholder.png`} size="medium" centered />
            <Card.Content>
                <Card.Header>{institution.name}</Card.Header>
                <Card.Meta>
                    {institution.address}
                </Card.Meta>
                <Card.Description>
                    {institution.description.slice(0, 300) + "..."}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button as={Link} to={`/manage/${id}`}type='button' content='Edit' />
                    <Button as={Link} to='/Institutions' type='button' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})