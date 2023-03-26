import { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, List, Placeholder, Segment } from 'semantic-ui-react';

export default function SpecialtiesListItemPlaceholder() {
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    return (
        <Segment basic style={{ display: 'inline-block', width: isComputerOrTablet ? '16rem' : '13rem', overflow: 'hidden', margin: 0, padding: '0.3rem' }}>
            <Placeholder style={{ height: isComputerOrTablet ? '14rem' : '12rem', padding: 0 }}>
                <Placeholder.Image />
            </Placeholder>
        </Segment>
    );
};