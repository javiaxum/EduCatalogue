import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import InstitutionDetailsInfoForm from '../form/InstitutionDetailsInfoForm';
import InstitutionDetailsGallery from './gallery/InstitutionDetailsGallery';
import InstitutionDetailsLocationForm from './location/InstitutionDetailsLocationForm';
import InstitutionDetailsReviewsList from './reviews/InstitutionDetailsReviewsList';
import InstitutionDetailsSpecialtiesList from './specialties/InstitutionDetailsSpecialtiesList';

export default observer(function InstitutionDetailsContent() {
    const { t } = useTranslation();
    const { institutionStore: { setActiveMenuItem, activeMenuItem } } = useStore();
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    const items = [
        'About',
        'Available Specialties',
        'Reviews',
        'Location',
        'Gallery'];
    const components = [
        <InstitutionDetailsInfoForm />,
        <InstitutionDetailsSpecialtiesList />,
        <InstitutionDetailsReviewsList />,
        <InstitutionDetailsLocationForm />,
        <InstitutionDetailsGallery />,
    ]
    return (
        <>
            <Menu pointing secondary stackable={isMobile} style={{ width: isComputerOrTablet ? '37rem' : '' }}>
                {items.map((i, index) =>
                    <Menu.Item
                        name={i}
                        key={index}
                        active={activeMenuItem === i}
                        content={t(i)}
                        onClick={() => setActiveMenuItem(i)}
                    />
                )}
            </Menu>
            {components[items.indexOf(activeMenuItem)]}
        </>
    )
})