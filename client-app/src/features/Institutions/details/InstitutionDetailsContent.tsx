import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import InstitutionDetailsGallery from './gallery/InstitutionDetailsGallery';
import InstitutionDetailsInfo from './InstitutionDetailsInfo';
import InstitutionDetailsLocation from './location/InstitutionDetailsLocation';
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
        <InstitutionDetailsInfo />,
        <InstitutionDetailsSpecialtiesList />,
        <InstitutionDetailsReviewsList />,
        <InstitutionDetailsLocation />,
        <InstitutionDetailsGallery />,
    ]
    return (
        <>
            <Menu pointing secondary style={{ width: isComputerOrTablet ? '37rem' : "auto" }}>
                {items.map((i) =>
                    <Menu.Item
                        name={i}
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