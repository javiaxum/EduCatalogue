import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';
import { EducationalComponent } from '../../../../app/models/educationalComponent';
import ComponentListItemForm from './ComponentListItemForm';
import { useMediaQuery } from 'react-responsive';

interface Props {
    setEduComponents: React.Dispatch<React.SetStateAction<EducationalComponent[] | undefined>>;
}

export default observer(function SpecialtyDetailsComponentListAddNewItem({ setEduComponents }: Props) {
    const [newComponentForm, setNewComponentForm] = useState<boolean>(false);
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });

    return (
        <>
            {!newComponentForm ?
                <Button
                    fluid
                    style={{ color: '#999', alignItems: 'center', display: 'flex', width: '18rem', margin: isComputerOrTablet ? '0.2rem' : '0 auto' }}
                    type='button'
                    onClick={() => setNewComponentForm(true)}>
                    <Icon name='plus' size='large' style={{ width: '100%' }} />
                </Button> :
                <ComponentListItemForm
                    activeForm={newComponentForm}
                    setEduComponents={setEduComponents}
                    setActiveForm={setNewComponentForm}
                    component={new EducationalComponent()} />}
        </>
    )
})