import { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, List, Placeholder, Segment } from 'semantic-ui-react';

export default function SpecialtiesListItemPlaceholder() {
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    return (
        <Placeholder style={{ margin: '0.1rem 0.3rem', display: 'inline-block', width: isComputerOrTablet ? '15.2rem' : '100%', height: isComputerOrTablet ? '14rem' : '8rem', padding: 0 }}>
            <Placeholder.Image />
        </Placeholder>
    );
};