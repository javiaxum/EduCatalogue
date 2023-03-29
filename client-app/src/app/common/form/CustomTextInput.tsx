import { useField } from 'formik';
import React from 'react';
import { Form, Label, StrictHeaderProps } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    disabled?: boolean;
    label?: any;
    type?: string;
    margin?: string;
    padding?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    fontWeight?: string;
}
export default function CustomTextInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field
            error={meta.touched && !!meta.error}
            style={{ margin: props.margin ? props.margin : 0, width: props.width, display: 'inline-block', padding: props.padding }}>
            <label style={{ margin: '0' }}>{props.label}</label>
            <input
                {...field}
                {...props}
                style={{ padding: props.padding, position: 'relative', fontWeight: props.fontWeight}}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : (null)}
        </Form.Field>
    )
}