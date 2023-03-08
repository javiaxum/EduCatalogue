import { useFormikContext } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Grid, Icon, Label } from 'semantic-ui-react';
import { EducationalComponent } from '../../../../app/models/educationalComponent';
import { useStore } from '../../../../app/stores/store';
import ComponentListItemForm from './ComponentListItemForm';


interface Props {
    component: EducationalComponent;
    setEduComponents: React.Dispatch<React.SetStateAction<EducationalComponent[] | undefined>>;
}

export default observer(function ComponentListItem({ component, setEduComponents }: Props) {
    const { t, i18n } = useTranslation();
    const { specialtyStore, commonStore: { editMode } } = useStore();
    const [activeForm, setActiveForm] = useState<boolean>(false);

    const formik = useFormikContext();
    function handleComponentDelete(componentFormValue: EducationalComponent) {
        let eduComponents = formik.getFieldProps('componentDTOs').value.slice() as EducationalComponent[];
        const newEduComponents = eduComponents.filter((c) => c.id != componentFormValue.id);
        formik.getFieldHelpers('componentDTOs').setValue(newEduComponents);
        setEduComponents(newEduComponents);
    }

    if (!activeForm)
        return (
            <Grid.Column style={{ width: '250px', padding: '0.5rem' }}>
                <Card className='componentCard' style={{ display: 'flex' }}>
                    <Card.Content style={{ padding: '1rem 1rem 0 1rem' }}>
                        {editMode && <>
                            <Button
                                basic
                                style={{ position: 'absolute', right: -4, top: 8, margin: 0, padding: 0, border: 'none', boxShadow: 'none' }}
                                onClick={() => setActiveForm(!activeForm)}>
                                <Icon name='edit' />
                            </Button>
                            <Button
                                floated='right'
                                basic
                                style={{ position: 'absolute', left: 6, top: 8, margin: 0, padding: 0, border: 'none', boxShadow: 'none' }}
                                onClick={() => handleComponentDelete(component)}>
                                <Icon name='trash'  />
                            </Button>
                        </>}
                        <Card.Header as='a' style={{ padding: '0 0.4rem 0 0.8rem', fontSize: '1.2rem' }}>{component.name}</Card.Header>
                    </Card.Content>
                    <Card.Meta style={{ padding: '0.3rem 0 1rem 1rem' }} >
                        {t('ECTS credits') + ": " + component.ectsCredits}
                        {component.isOptional && <Label content={t('Optional')} attached='bottom right' />}
                    </Card.Meta>
                </Card>
            </Grid.Column>
        )
    else
        return (
            <ComponentListItemForm
                component={component}
                setActiveForm={setActiveForm}
                activeForm={activeForm}
                setEduComponents={setEduComponents}
                handleComponentDelete={handleComponentDelete} />
        )
})