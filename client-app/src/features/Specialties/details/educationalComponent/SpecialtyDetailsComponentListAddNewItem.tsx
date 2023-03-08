import { useFormikContext } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { EducationalComponent } from '../../../../app/models/educationalComponent';
import { useStore } from '../../../../app/stores/store';
import ComponentListItemForm from './ComponentListItemForm';

interface Props {
    setEduComponents: React.Dispatch<React.SetStateAction<EducationalComponent[] | undefined>>;
}

export default function SpecialtyDetailsComponentListAddNewItem({ setEduComponents }: Props) {
    const { id } = useParams();
    const [newComponentForm, setNewComponentForm] = useState<boolean>(false);

    return (
        <Grid.Column style={{ width: '250px', padding: '0.5rem' }}>
            {!newComponentForm ? <Button
                fluid
                style={{ color: '#999', alignItems: 'center', display: 'flex', minHeight: '100px' }}
                type='button'
                onClick={() => setNewComponentForm(true)}
            >
                <Icon name='plus' size='large' style={{ width: '100%' }} />
            </Button> :
                newComponentForm &&
                <ComponentListItemForm
                    activeForm={newComponentForm}
                    setEduComponents={setEduComponents}
                    setActiveForm={setNewComponentForm}
                    component={new EducationalComponent()} />}
        </Grid.Column>
    )
}