import { observer } from 'mobx-react-lite';
import React from 'react';
import { Checkbox, GridColumn } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {
    id: number | string;
    name?: string;
    disabled?: boolean
    togglePredicateParam: (predicate: string | number, value: boolean) => void;
    checked: boolean;
}

export default observer(function SearchParamItem({ id, name, togglePredicateParam, checked, disabled }: Props) {

    return (
        <GridColumn width={16} style={{ padding: '0.2rem' }}>
            <Checkbox
                key={id}
                checked={checked}
                label={name}
                disabled={disabled || false}
                onChange={() => {
                    togglePredicateParam(id, !checked)
                }}
            />
        </GridColumn>
    )
})