import { useField } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Checkbox, DropdownProps, Form, Label, Select } from 'semantic-ui-react';

interface Props {
    name: string;
    disabled?: boolean;
    checked?: any;
    label?: string;
}

export default observer(function CustomSelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error} style={{ minHeight: 'auto', margin: '0' }}>
            <label style={{ margin: '0' }}>{props.label}</label>
            <Checkbox
                disabled={props.disabled}
                checked={!!field.value || false}
                onChange={(e, d) => {
                    helpers.setValue(!field.value);
                }}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : (null)}
        </Form.Field>
    )
})