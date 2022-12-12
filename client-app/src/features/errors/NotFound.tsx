import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
    return (
        <Segment textAlign='center'>
            <Header>
                <Icon name='search' />
                We've looked everywhere but could not find what you are looking for!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/institutions' content='Return to institutions search'/>
            </Segment.Inline>
        </Segment>
    )
}