import React, { useEffect } from 'react';
import { Dropdown, Form, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import SpecialtyCoreSearchParamsList from './SpecialtyCoreSearchParamsList';

export default function SearchParamsSideBar() {
    // list of Specialties will be mapped into checkboxes
    // implement custom radio button    

    return (
        <Segment>
            <Header as='h3' content='Filtering options'/>
            <SpecialtyCoreSearchParamsList />
            {/* <Form>

            </Form> */}
        </Segment>
    )
}