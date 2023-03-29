import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
    const { t } = useTranslation();
    
    return (
        <Segment textAlign='center'>
            <Header>
                <Icon name='search' />
                {t(`We've looked everywhere but could not find what you are looking for!`)}
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/institutions' content='Return to institutions search' />
            </Segment.Inline>
        </Segment>
    )
}