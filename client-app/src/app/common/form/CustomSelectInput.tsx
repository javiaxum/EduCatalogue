import { useField } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Dropdown, DropdownProps, Form, Label, Placeholder, Select } from 'semantic-ui-react';

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
    multiple?: boolean;
    maxHeight?: string;
    loading?: boolean;
}

export default observer(function CustomSelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <>
            {props.loading ?
                <Placeholder >
                    <Placeholder.Line style={{ width: props.width }} />
                </Placeholder> :
                <Form.Field error={meta.touched && !!meta.error} style={{ minHeight: 'auto', maxHeight: props.maxHeight, margin: '0', width: props.width, display: 'inline-block', padding: props.padding }}>
                    <label style={{ margin: '0' }}>{props.label}</label>
                    <Dropdown
                        style={{ minWidth: props.width }}
                        search
                        selection
                        clearable
                        multiple={props.multiple}
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
                        <Label basic color='red' style={{ position: 'absolute', width: '18rem', zIndex: '1000' }}>{meta.error}</Label>
                    ) : (null)}
                </Form.Field>}
        </>

    )
})