import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Placeholder } from 'semantic-ui-react';

export default function ComponentListItemPlaceholder() {
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });

    return (
        <Placeholder style={{ display: 'flex', width: '18rem', height: '7rem', margin: isComputerOrTablet ? '0.2rem' : '0.2rem auto' }}>
            <Placeholder.Line />
        </Placeholder>

    )
}