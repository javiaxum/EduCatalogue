import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function InstitutionDetailsMenu() {
    const { institutionStore } = useStore();
    const { setActiveMenuItem, detailsMenuActiveItem } = institutionStore;
    const { t, i18n } = useTranslation();
    return (
        <Menu widths={5} style={{ width: '50rem', boxShadow: 'none', border: '0 1px 0 1px' }} color='blue'>
            <Menu.Item
                name={'About'}
                active={detailsMenuActiveItem === 'About'}
                onClick={(e, d) => setActiveMenuItem('About')}>
                {t('About')}
            </Menu.Item>
            <Menu.Item
                name={'Specialties'}
                active={detailsMenuActiveItem === 'Specialties'}
                onClick={(e, d) => setActiveMenuItem('Specialties')}>
                {t('Available Specialties')}
            </Menu.Item>
            <Menu.Item
                name={'Reviews'}
                active={detailsMenuActiveItem === 'Reviews'}
                onClick={(e, d) => setActiveMenuItem('Reviews')}>
                {t('Reviews')}
            </Menu.Item>
            <Menu.Item
                name={'Location'}
                active={detailsMenuActiveItem === 'Location'}
                onClick={(e, d) => setActiveMenuItem('Location')}>
                {t('Location')}
            </Menu.Item>
            <Menu.Item
                name={'Gallery'}
                active={detailsMenuActiveItem === 'Gallery'}
                onClick={(e, d) => setActiveMenuItem('Gallery')}>
                {t('Gallery')}
            </Menu.Item>
        </Menu>
    )
})