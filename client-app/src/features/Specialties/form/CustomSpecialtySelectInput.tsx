import { useField, useFormikContext } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default observer(function CustomSpecialtySelectInput(props: Props) {
    const { specialtyStore } = useStore();
    const formik = useFormikContext();
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(e, d) => {
                    helpers.setValue(d.value);
                    formik.setFieldValue('iscedCode', `iscedCode: ${specialtyStore.getSpecialtyCore(d.value as string)?.iscedCode}`)
                    formik.setFieldValue('uaCode', `uaCode: ${specialtyStore.getSpecialtyCore(d.value as string)?.uaCode}`)
                }}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : (null)}
        </Form.Field>
    )
})