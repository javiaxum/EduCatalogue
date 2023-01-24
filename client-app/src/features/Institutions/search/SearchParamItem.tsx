import { observer } from 'mobx-react-lite';
import React from 'react';
import { Checkbox, GridColumn } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {
    id: string;
    name?: string;
    togglePredicateParam: (predicate: string, value: boolean) => void;
    checked: boolean;
}

export default observer(function SearchParamItem({ id, name, togglePredicateParam, checked }: Props) {

    const { institutionStore, specialtyStore } = useStore();

    return (
        <GridColumn width={16} style={{ padding: '0.2rem' }}>
            <Checkbox
                key={id}
                checked={checked}
                label={name}
                disabled={(
                    id.length === 3
                    && !institutionStore.specialtyAndBranchPredicates.find((x) => x.length === 2 && x === id.slice(0, 2)))
                    && institutionStore.specialtyAndBranchPredicates.find((x) => x.length === 2)}
                onChange={() => {
                    togglePredicateParam(id, !checked)
                }}
            />
        </GridColumn>
    )
})