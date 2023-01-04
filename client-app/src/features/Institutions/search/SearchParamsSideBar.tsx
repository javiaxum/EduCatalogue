import React, { useEffect } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import SpecialtyCoreSearchParamsList from './SpecialtyCoreSearchParamsList';

export default function SearchParamsSideBar() {
    // list of Specialties will be mapped into checkboxes
    // implement custom radio button    

    return (
        <>
            <SpecialtyCoreSearchParamsList />
            {/* <Form>

            </Form> */}
        </>
    )
}