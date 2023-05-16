import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function EmailConfirmed() {

    const { t } = useTranslation();

    return (
        <Segment textAlign='center'>
            <Header>
                <Icon name='check' color='green' />
                {t('Email has been confirmed successfully')}
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/institutions' content={t('Return to institutions search')} />
            </Segment.Inline>
        </Segment>
    )
}