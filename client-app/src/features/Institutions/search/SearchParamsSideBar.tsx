import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import SpecialtyCoreSearchParamsList from './SearchParamsList';

export default function SearchParamsSideBar() {

    return (
        <Segment>
            <Header as='h3' content='Filtering options'/>
            <SpecialtyCoreSearchParamsList />
        </Segment>
    )
}