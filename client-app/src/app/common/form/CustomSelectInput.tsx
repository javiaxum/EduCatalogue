import { useField } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DropdownProps, Form, Label, Select } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    disabled?: boolean;
    value?: any;
    label?: string;
    onChange?: (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => void;
}

export default observer(function CustomSelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error} style={{ minHeight: 'auto', margin: '0' }}>
            <label style={{ margin: '0' }}>{props.label}</label>
            <Select
                disabled={props.disabled}
                options={props.options}
                value={field.value || props.value}
                onChange={(e, d) => {
                    helpers.setValue(d.value);
                    if (props.onChange) props.onChange(e, d);
                }}
                onBlur={() => helpers.setTouched(true)}
                placeholder={field.value || props.placeholder}
                style={{ height: 'auto', minHeight: 'auto', padding: '.4rem 1.2rem .4rem .4rem' }}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : (null)}
        </Form.Field>
    )
})