import { observer } from 'mobx-react-lite';
import React from 'react';
import { Checkbox, GridColumn } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {
    id: number | string;
    name?: string;
    disabled?: boolean
    isSpecialtyParam?: boolean;
    togglePredicateParam: (predicate: string | number, value: boolean) => void;
    checked: boolean;
}

export default observer(function SearchParamItem({ id, name, togglePredicateParam, checked, disabled, isSpecialtyParam }: Props) {

    const { institutionStore, specialtyStore } = useStore();

    return (
        <GridColumn width={16} style={{ padding: '0.2rem' }}>
            <Checkbox
                key={id}
                checked={checked}
                label={name}
                disabled={disabled || false}
                // disabled={(
                //     isSpecialtyParam
                //     && !institutionStore.specialtyAndBranchPredicates.find((x) => x.length === 2 && x === id.slice(0, 2)))
                //     && institutionStore.specialtyAndBranchPredicates.find((x) => x.length === 2)}
                onChange={() => {
                    togglePredicateParam(id, !checked)
                }}
            />
        </GridColumn>
    )
})