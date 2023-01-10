import React from 'react';
import { Checkbox, Segment } from 'semantic-ui-react';
import { SpecialtyCore } from '../../../app/models/specialtyCore';

interface Props {
    specialtyCore: SpecialtyCore;
}

export default function SpecialtyCoreSearchParamItem({specialtyCore}: Props) {
    return (
        <Segment basic>
            <Checkbox label={`${specialtyCore.localSpecialtyCode} ${specialtyCore.localSpecialtyName}`} style={{color: '#444'}}/>
        </Segment>
    )
}