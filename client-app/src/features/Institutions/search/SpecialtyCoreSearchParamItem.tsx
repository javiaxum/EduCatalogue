import React from 'react';
import { Checkbox, Segment } from 'semantic-ui-react';
import { SpecialtyCore } from '../../../app/models/specialtyCore';

interface Props {
    specialtyCore: SpecialtyCore;
}

export default function SpecialtyCoreSearchParamItem({specialtyCore}: Props) {
    return (
        <Segment basic>
            <Checkbox label={`${specialtyCore.id} ${specialtyCore.name}`} style={{color: '#444'}}/>
        </Segment>
    )
}