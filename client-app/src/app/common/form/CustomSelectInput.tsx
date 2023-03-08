import { useField } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Dropdown, DropdownProps, Form, Label, Select } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    disabled?: boolean;
    value?: any;
    label?: string;
    onChange?: (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => void;
    width?: string;
    padding?: string;
}

export default observer(function CustomSelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error} style={{ minHeight: 'auto', margin: '0', width: props.width, display: 'inline-block', padding: props.padding }}>
            <label style={{ margin: '0' }}>{props.label}</label>
            <Dropdown
                style={{minWidth: props.width}}
                search
                selection
                clearable
                disabled={props.disabled}
                options={props.options}
                value={field.value || props.value || null}
                onChange={(e, d) => {
                    helpers.setValue(d.value as string);
                    if (props.onChange) props.onChange(e, d);
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