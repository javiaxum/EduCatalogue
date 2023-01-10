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
    const formik = useFormikContext();
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error} style={{margin: '0', height: '35px', minHeight: '0'}}>
            <label style={{margin: '0'}}>{props.label}</label>
            <Select
                clearable
                placeholder={field.value}
                options={props.options}
                onChange={(e, d) => {
                    helpers.setValue(d.value);
                    const specialtyCore = new SpecialtyCore(specialtyStore.getSpecialtyCore(d.value as string))
                    formik.setFieldValue('iscedSpecialtyCode', specialtyCore.iscedSpecialtyCode)
                    formik.setFieldValue('localSpecialtyCode', specialtyCore.localSpecialtyCode)
                    formik.setFieldValue('localBranchCode', specialtyCore.localBranchCode)
                    formik.setFieldValue('localBranchName', specialtyCore.localBranchName)
                }}
                onBlur={() => helpers.setTouched(true)}
                style={{height: 'auto', minHeight: '0', padding: '.7rem 1.8rem .7rem .7rem'}}
                />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : (null)}
        </Form.Field>
    )
})