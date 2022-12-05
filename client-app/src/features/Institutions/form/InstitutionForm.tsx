import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Institution } from '../../../app/models/institution';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';


export default observer(function InstitutionForm() {

    const { institutionStore, } = useStore();
    const { loading, loadInstitution, loadingInitial, createInstitution, editInstitution, setLoadingInitial } = institutionStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [institution, setInstitution] = useState({
        id: '',
        name: '',
        description: '',
        address: '',
        siteURL: '',
        titleImage: ''
    });

    useEffect(() => {
        if (id) loadInstitution(id).then(institution => setInstitution(institution!));
        else setLoadingInitial(false);
    }, [loadInstitution, id, setLoadingInitial])

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setInstitution({ ...institution, [name]: value });
    }

    function handleInstitutionFormSubmit(i: Institution) {
        if (i.id.length === 0) {
            let newInstitution = {
                ...i,
                id: uuid()
            }
            createInstitution(i).then(() => navigate(`/institutions/${newInstitution.id}`));
        } else {
            editInstitution(i).then(() => navigate(`/institutions/${i.id}`));
        }
    }
    if (loadingInitial) return <LoadingComponent content='Loading institution form...' />

    return (
        <Segment clearing>
            <Form onSubmit={() => handleInstitutionFormSubmit(institution)} autoComplete='off'>
                <Form.Input placeholder='Name' name='name' value={institution.name} onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' name='description' value={institution.description} onChange={handleInputChange} />
                <Form.Input placeholder='Address' name='address' value={institution.address} onChange={handleInputChange} />
                <Form.Input placeholder='SiteURL' name='siteURL' value={institution.siteURL} onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' loading={loading} />
                <Button as={Link} to='/Institutions' floated='right' type='button' content='Cancel' disabled={loading} />
            </Form>
        </Segment>
    )
})