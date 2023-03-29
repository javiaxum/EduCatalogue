import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function PasswordConfirmed() {
    
    const { t } = useTranslation();

    return (
        <Segment textAlign='center'>
            <Header>
                <Icon name='check' color='green' />
                {t('Password has been changed successfully')}
            </Header>
        </Segment>
    )
}