import React from 'react';
import { Checkbox, Dropdown, GridColumn, Segment } from 'semantic-ui-react';
import { Branch } from '../../../app/models/branch';

interface Props {
    branch: Branch;
}

export default function BranchSearchParamItem({ branch }: Props) {
    return (
        <GridColumn width={16} style={{padding: '0.5rem'}}>
            <Checkbox label={`${branch.id} ${branch.name}`} style={{ color: '#444', fontSize: '1rem', whiteSpace: 'wrap' }} />
        </GridColumn>
    )
}