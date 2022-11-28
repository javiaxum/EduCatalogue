import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Institution } from '../../../app/models/institution';

interface Props {
    selectedInstitution: Institution | undefined;
    closeForm: () => void;
    handleInstitutionFormSubmit: (institution: Institution) => void;
}

export default function InstitutionForm({ closeForm, selectedInstitution, handleInstitutionFormSubmit }: Props) {

    const initialState = selectedInstitution ?? {
        id: '',
        name: '',
        description: '',
        address: '',
        siteURL: '',
        titleImage: ''
    }

    const [institution, setInstitution] = useState(initialState);

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setInstitution({ ...institution, [name]: value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={() => handleInstitutionFormSubmit(institution)} autoComplete='off'>
                <Form.Input placeholder='Name' name='name' value={institution.name} onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' name='description' value={institution.description} onChange={handleInputChange} />
                <Form.Input placeholder='Address' name='address' value={institution.address} onChange={handleInputChange} />
                <Form.Input placeholder='SiteURL' name='siteURL' value={institution.siteURL} onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => closeForm()} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}