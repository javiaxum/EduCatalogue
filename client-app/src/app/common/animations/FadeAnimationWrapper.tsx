import React from 'react';
import { Transition, Placeholder } from 'semantic-ui-react';

interface Props {
    loading: boolean;
    children: any;
    placeholder: any;
    style?: any;
}

export default function FadePlaceholderAnimationWrapper({ loading, children, placeholder }: Props) {
    return (
        <>
            <Transition
                visible={!loading}
                duration={500}
                size='huge'
                verticalAlign='middle'>
                {children}
            </Transition>
            <Transition
                visible={loading}
                duration={500}
                size='huge'
                verticalAlign='middle'>
                {placeholder}
            </Transition>
        </>
    )
}