import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { EducationalComponent } from '../../../../app/models/educationalComponent';
import { useStore } from '../../../../app/stores/store';
import ComponentListItem from './ComponentListItem';
import SpecialtyDetailsComponentListAddNewItem from './SpecialtyDetailsComponentListAddNewItem';
import ComponentListItemPlaceholder from './ComponentListItemPlaceholder';
import { useTranslation } from 'react-i18next';

export default observer(function SpecialtyDetailsComponentList() {
    const { specialtyStore, commonStore } = useStore();
    const { editMode } = commonStore;
    const { t } = useTranslation();

    useEffect(() => {
        setLocalComponents(specialtyStore.selectedSpecialty?.componentDTOs);
    }, [specialtyStore.selectedSpecialty])

    useEffect(() => { return () => setLocalComponents([]) }, [])

    let placeholders = [];
    for (let i = 0; i < 16; i++) {
        placeholders.push(<ComponentListItemPlaceholder key={i} />);
    }

    const [localComponents, setLocalComponents] = useState<EducationalComponent[] | undefined>(specialtyStore.selectedSpecialty?.componentDTOs);
    return (
        <Grid style={{ display: 'flex', padding: 0, margin: '0 auto', width: '100%' }}>
            {(localComponents && localComponents.length === 0 && !editMode) &&
                <Segment style={{ color: '#444' }}>{t('There are no educational components available')}...</Segment>}
            {(localComponents && localComponents.length !== 0 && !specialtyStore.loading) &&
                localComponents.map((component) => (
                    <ComponentListItem
                        component={component}
                        setEduComponents={setLocalComponents}
                        key={component.id} />))}
            {specialtyStore.loading && placeholders}
            {editMode &&
                <SpecialtyDetailsComponentListAddNewItem setEduComponents={setLocalComponents} />}
        </Grid>
    )
})