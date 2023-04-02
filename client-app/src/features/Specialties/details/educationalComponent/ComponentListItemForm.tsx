import { Formik, useFormikContext } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, DropdownItemProps, DropdownProps, Grid, Icon, Segment } from 'semantic-ui-react';
import { ComponentFormValues, EducationalComponent } from '../../../../app/models/educationalComponent';
import { useStore } from '../../../../app/stores/store';
import * as Yup from 'yup';
import CustomSelectInput from '../../../../app/common/form/CustomSelectInput';
import CustomTextInput from '../../../../app/common/form/CustomTextInput';
import CustomCheckboxInput from '../../../../app/common/form/CustomCheckboxInput';
import { v4 as uuid } from 'uuid';
import { useMediaQuery } from 'react-responsive';


interface Props {
    component: EducationalComponent;
    activeForm: boolean;
    setActiveForm: React.Dispatch<React.SetStateAction<boolean>>;
    setEduComponents: React.Dispatch<React.SetStateAction<EducationalComponent[] | undefined>>;
    handleComponentDelete?(componentFormValue: EducationalComponent): void;
}

export default observer(function ComponentListItemForm({ component, setActiveForm, activeForm, setEduComponents, handleComponentDelete }: Props) {
    const { t } = useTranslation();
    const { specialtyStore, commonStore } = useStore();
    const [eduComponent, setEduComponent] = useState<ComponentFormValues>(new ComponentFormValues())
    const formik = useFormikContext();
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });

    useEffect(() => {
        if (component && component.componentCoreId && component.ectsCredits && component.name)
            setEduComponent(component);
        commonStore.setEditMode(true);
    }, [commonStore, component, setEduComponent])

    const componentCoreOptions: DropdownItemProps[] = specialtyStore.componentCoresById.map(componentCore => ({
        key: componentCore.id,
        text: componentCore.name,
        value: componentCore.id,
    }));


    const validationSchema = Yup.object({
        componentCoreId: Yup.number().required(),
        ectsCredits: Yup.number().required(),
    })

    function handleComponentFormSubmit(componentFormValue: ComponentFormValues) {
        let eduComponents = formik.getFieldProps('componentDTOs').value.slice() as EducationalComponent[];
        let newComponent = new EducationalComponent(componentFormValue);
        if (component.id) {
            var index = eduComponents.indexOf(component);
            eduComponents[index] = newComponent;
            setEduComponents(eduComponents);
            formik.getFieldHelpers('componentDTOs').setValue(eduComponents);
        }
        else {
            newComponent.id = uuid();
            eduComponents.push(newComponent);
            setEduComponents(eduComponents);
            formik.getFieldHelpers('componentDTOs').setValue(eduComponents);
        }
    }

    return (
        <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={eduComponent}
            onSubmit={values => handleComponentFormSubmit(values)}>
            {({ handleSubmit, isValid, isSubmitting, dirty, getFieldProps, getFieldHelpers }) => (
                <Card className='componentCard' style={{ display: 'flex', width: '18rem', margin: isComputerOrTablet ? '0.2rem' : '0 auto' }}>
                    <Card.Content style={{ padding: '1rem 1rem 0 1rem' }}>
                        <Button
                            floated='right'
                            basic
                            style={{ position: 'absolute', right: -4, top: 8, margin: 0, padding: 0, border: 'none', boxShadow: 'none' }}
                            onClick={() => setActiveForm(!activeForm)}>
                            <Icon name='edit' />
                        </Button>
                        {handleComponentDelete && <Button
                            floated='right'
                            basic
                            style={{ position: 'absolute', left: 6, top: 8, margin: 0, padding: 0, border: 'none', boxShadow: 'none' }}
                            onClick={() => handleComponentDelete(component)}>
                            <Icon name='trash' />
                        </Button>}
                        <CustomSelectInput
                            onChange={(event, data) => {
                                getFieldHelpers('name').setValue(specialtyStore.getComponentCore(data.value as number)?.name)
                            }}
                            padding='0 0 0 0.5rem'
                            options={componentCoreOptions}
                            placeholder={t('Select specialty')}
                            name='componentCoreId'
                            width='13rem' />
                        <Segment
                            basic
                            style={{ padding: '0' }}>
                            {t('ECTS credits') + ": "}
                            <CustomTextInput
                                padding='0.4em 0.2em 0.4em 0.2em'
                                width='5rem'
                                type='number'
                                placeholder='0'
                                name='ectsCredits' />
                        </Segment>
                    </Card.Content>
                    <Card.Meta style={{ padding: '0.3rem 0 1rem 1rem' }} >
                        {t('Is optional') + ': '}
                        <CustomCheckboxInput name='isOptional' />
                    </Card.Meta>
                    <Button
                        type='submit'
                        disabled={!dirty || isSubmitting || !isValid}
                        content={t('Save')}
                        onClick={() => {
                            handleSubmit()
                            setActiveForm(!activeForm)
                        }}>
                    </Button>
                </Card>
            )}
        </Formik >
    )
})