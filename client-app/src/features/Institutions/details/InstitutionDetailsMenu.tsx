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
                name={t('General info')!}
                active={detailsMenuActiveItem === 'About'}
                onClick={(e, d) => setActiveMenuItem(d.name!)}
            >
                About
            </Menu.Item>
            <Menu.Item
                name={t('Specialties')!}
                active={detailsMenuActiveItem === 'Specialties'}
                onClick={(e, d) => setActiveMenuItem(d.name!)}
            >
                Available Specialties
            </Menu.Item>
            <Menu.Item
                name='Reviews'
                active={detailsMenuActiveItem === 'Reviews'}
                onClick={(e, d) => setActiveMenuItem(d.name!)}
            >
                Reviews
            </Menu.Item>
            <Menu.Item
                name='Location'
                active={detailsMenuActiveItem === 'Location'}
                onClick={(e, d) => setActiveMenuItem(d.name!)}
            >
                Location on the map
            </Menu.Item>
            <Menu.Item
                name='Gallery'
                active={detailsMenuActiveItem === 'Gallery'}
                onClick={(e, d) => setActiveMenuItem(d.name!)}
            >
                Gallery
            </Menu.Item>
        </Menu>
    )
})