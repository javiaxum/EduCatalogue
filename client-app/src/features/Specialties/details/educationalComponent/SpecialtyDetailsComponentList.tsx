import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';
import ComponentListItem from './ComponentListItem';
import SpecialtyDetailsComponentListAddNewItem from './SpecialtyDetailsComponentListAddNewItem';

export default observer(function SpecialtyDetailsComponentList() {
    const { specialtyStore, commonStore } = useStore();
    const { editMode } = commonStore;

    return (
        <Grid style={{ display: 'block' }}>
            {specialtyStore.selectedSpecialty?.components.length === 0
                || !specialtyStore.selectedSpecialty?.components
                ? (<>{!editMode && <Segment style={{ color: '#444' }}>There are no educational components available...</Segment>}</>)
                : (<>
                    {specialtyStore.selectedSpecialty.components.map((component) => (
                        <ComponentListItem component={component} key={component.id} />
                    ))}
                </>
                )}
            {editMode &&
                <SpecialtyDetailsComponentListAddNewItem />}
        </Grid>
    )
})