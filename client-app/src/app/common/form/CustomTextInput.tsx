import { useField } from 'formik';
import React, { useState } from 'react';
import { Button, Form, Icon, Label, StrictHeaderProps } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    disabled?: boolean;
    label?: any;
    min?: number;
    max?: number;
    type?: string;
    margin?: string;
    padding?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    fontWeight?: string;
}
export default function CustomTextInput(props: Props) {
    const [type, setType] = useState(props.type);
    const [field, meta] = useField(props.name);
    return (
        <Form.Field
            error={meta.touched && !!meta.error}
            style={{ margin: props.margin ? props.margin : 0, width: props.width, display: 'inline-block', padding: props.padding }}>
            <label style={{ margin: '0' }}>{props.label}</label>
            <input
                {...field}
                {...props}
                type={type}
                min={props.min}
                max={props.max}
                style={{ padding: props.padding, position: 'relative', fontWeight: props.fontWeight }} />
            {props.type === 'password' &&
                <Button
                    basic
                    icon={type !== 'password' ? 'eye' : 'eye slash'}
                    type='button'
                    className='show-password'
                    style={{ position: 'absolute', right: '0', boxShadow: 'none' }}
                    onClick={() => setType(type === 'password' ? 'text' : 'password')} />}
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : (null)}
        </Form.Field>
    )
}