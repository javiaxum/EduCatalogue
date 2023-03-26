import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { EducationalComponent } from '../../../../app/models/educationalComponent';
import { useStore } from '../../../../app/stores/store';
import ComponentListItem from './ComponentListItem';
import SpecialtyDetailsComponentListAddNewItem from './SpecialtyDetailsComponentListAddNewItem';

export default observer(function SpecialtyDetailsComponentList() {
    const { specialtyStore, commonStore } = useStore();
    const { editMode } = commonStore;

    const [localComponents, setLocalComponents] = useState<EducationalComponent[] | undefined>(specialtyStore.selectedSpecialty?.componentDTOs);
    return (
        <Grid style={{ display: 'block', padding: 0, margin: '0 auto', width: '100%' }}>
            {(localComponents && localComponents.length === 0 && !editMode) &&
                <Segment style={{ color: '#444' }}>There are no educational components available...</Segment>}
            {(localComponents && localComponents.length !== 0) &&
                localComponents.map((component) => (
                    <ComponentListItem
                        component={component}
                        setEduComponents={setLocalComponents}
                        key={component.id} />))}
            {editMode &&
                <SpecialtyDetailsComponentListAddNewItem setEduComponents={setLocalComponents} />}
        </Grid>
    )
})