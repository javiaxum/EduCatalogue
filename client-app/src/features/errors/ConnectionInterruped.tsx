import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ConnectionInterruped() {
    const { t } = useTranslation();

    return (
        <Segment textAlign='center'>
            <Header>
                <Icon name='unlink' />
                {t('Connection has been interrupted')}! {t('Check your network connection')}.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/institutions' content={t('Return to institutions search')} />
            </Segment.Inline>
        </Segment>
    )
}