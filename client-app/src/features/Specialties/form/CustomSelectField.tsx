import { useField } from 'formik';
import React from 'react';
import { Form, Label, StrictHeaderProps } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
}
    export default function CustomSelectField(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label style={{margin: '0'}}>{props.label}</label>
            <input style={{padding: '0 0.2em 0 0.2em', height: '16.5px'}} {...field} {...props} disabled={true}/>
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : (null)}
        </Form.Field>
    )
}