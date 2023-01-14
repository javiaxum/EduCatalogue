import { Field } from 'formik';
import React from 'react';
import { Checkbox, Dropdown, GridColumn, Segment } from 'semantic-ui-react';
import { Branch } from '../../../app/models/branch';

interface Props {
    branch: Branch;
}

export default function BranchSearchParamItem({ branch }: Props) {
    return (
        <GridColumn width={16} style={{padding: '0.5rem'}}>
            <Field type="checkbox" label={`${branch.id} ${branch.name}`} key={branch.id} name="checked" style={{ color: '#444', fontSize: '1rem', whiteSpace: 'wrap' }} />
        </GridColumn>
    )
}