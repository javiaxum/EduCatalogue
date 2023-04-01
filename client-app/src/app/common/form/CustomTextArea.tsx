import { useField } from 'formik';
import React from 'react';
import { Form, Label, Placeholder } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
    width?: string;
    loading?: boolean;
}

export default function CustomTextArea(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error} style={{ width: props.width }}>
            <label style={{ padding: '0' }}>{props.label}</label>
            {props.loading ?
                <Placeholder>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                </Placeholder> :
                <textarea {...field} {...props} />}
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : (null)}
        </Form.Field>
    )
}