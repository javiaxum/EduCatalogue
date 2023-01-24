import { useField } from 'formik';
import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function CustomSelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error} style={{ minHeight: 'auto', margin: '0' }}>
            <label style={{ margin: '0' }}>{props.label}</label>
            <Select
                options={props.options}
                value={field.value || null}
                onChange={(e, d) => { helpers.setValue(d.value) }}
                onBlur={() => helpers.setTouched(true)}
                placeholder={field.value || props.placeholder}
                style={{height: 'auto', minHeight: 'auto', padding: '.4rem 1.2rem .4rem .4rem'}}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : (null)}
        </Form.Field>
    )
}