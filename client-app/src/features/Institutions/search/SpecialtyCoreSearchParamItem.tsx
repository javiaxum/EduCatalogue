import React from 'react';
import { Checkbox, Dropdown, GridColumn, Segment } from 'semantic-ui-react';
import { SpecialtyCore } from '../../../app/models/specialtyCore';

interface Props {
    specialtyCore: SpecialtyCore;
}

export default function SpecialtyCoreSearchParamItem({ specialtyCore }: Props) {
    return (
        <GridColumn width={16} style={{padding: '0.5rem'}}>
            <Checkbox label={`${specialtyCore.id} ${specialtyCore.name}`} style={{ color: '#444', fontSize: '1rem', whiteSpace: 'wrap' }} />
        </GridColumn>
    )
}