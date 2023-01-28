import { useField } from 'formik';
import React from 'react';
import { Form, Label, StrictHeaderProps } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    disabled?: boolean;
    label?: string;
    type?: string;
    padding?: string;
}
    export default function CustomTextInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label style={{margin: '0'}}>{props.label}</label>
            <input {...field} {...props} style={{padding: props.padding}} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : (null)}
        </Form.Field>
    )
}