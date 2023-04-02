import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Button, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import InstitutionDetailsGallery from './gallery/InstitutionDetailsGallery';
import InstitutionDetailsInfo from './InstitutionDetailsInfo';
import InstitutionDetailsLocation from './location/InstitutionDetailsLocation';
import InstitutionDetailsReviewsList from './reviews/InstitutionDetailsReviewsList';
import InstitutionDetailsSpecialtiesList from './specialties/InstitutionDetailsSpecialtiesList';
import { Link, useParams } from 'react-router-dom';

export default observer(function InstitutionDetailsContent() {
    const { t } = useTranslation();
    const { institutionStore, profileStore, userStore, commonStore } = useStore();
    const { id } = useParams();
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    const items = [
        'About',
        'Available Specialties',
        'Reviews',
        'Location',
        'Gallery'];
    const components = [
        <InstitutionDetailsInfo />,
        <InstitutionDetailsSpecialtiesList />,
        <InstitutionDetailsReviewsList />,
        <InstitutionDetailsLocation />,
        <InstitutionDetailsGallery />,
    ]
    return (
        <>
            <Menu pointing secondary stackable={isMobile} style={{ width: isComputerOrTablet ? '37rem' : ''}}>
                {items.map((i, index) =>
                    <Menu.Item
                        name={i}
                        key={index}
                        active={institutionStore.activeMenuItem === i}
                        content={t(i)}
                        onClick={() => institutionStore.setActiveMenuItem(i)}
                    />
                )}
            </Menu>
            {components[items.indexOf(institutionStore.activeMenuItem)]}
        </>
    )
})