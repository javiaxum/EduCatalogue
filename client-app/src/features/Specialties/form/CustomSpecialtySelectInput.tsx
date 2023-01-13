import { useField, useFormikContext } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';
import { SpecialtyCore } from '../../../app/models/specialtyCore';
import { useStore } from '../../../app/stores/store';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
    padding?: string;
}

export default observer(function CustomSpecialtySelectInput(props: Props) {
    const { specialtyStore } = useStore();
    const { selectedSpecialty, getBranch } = specialtyStore;
    const formik = useFormikContext();
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error} style={{ margin: '0', height: '35px', minHeight: '0' }}>
            <label style={{ margin: '0' }}>{props.label}</label>
            <Select
                clearable
                placeholder={field.value}
                options={props.options}
                onChange={(e, d) => {
                    helpers.setValue(d.value);
                    const specialtyCore = new SpecialtyCore(specialtyStore.getSpecialtyCore(d.value as string))
                    let iscedCodeString = "";
                    for (let i = 0; i < specialtyCore.iscedCores.length; i++) {
                        if (iscedCodeString !== "") iscedCodeString += ` ${specialtyCore.iscedCores[i].id}`
                    }
                    formik.setFieldValue('iscedSpecialtyCode', iscedCodeString)
                    formik.setFieldValue('localSpecialtyCode', specialtyCore.id)
                    formik.setFieldValue('localBranchCode', selectedSpecialty?.id.slice(0, 2))
                    formik.setFieldValue('localBranchName', getBranch(selectedSpecialty?.id.slice(0, 2)!))
                }}
                onBlur={() => helpers.setTouched(true)}
                style={{ height: 'auto', minHeight: '0', padding: '.7rem 1.8rem .7rem .7rem' }}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : (null)}
        </Form.Field>
    )
})