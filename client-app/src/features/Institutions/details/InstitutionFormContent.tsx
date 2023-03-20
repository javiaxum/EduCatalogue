import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import InstitutionDetailsInfoForm from '../form/InstitutionDetailsInfoForm';
import InstitutionDetailsGallery from './gallery/InstitutionDetailsGallery';
import InstitutionDetailsLocationForm from './location/InstitutionDetailsLocationForm';
import InstitutionDetailsReviewsList from './reviews/InstitutionDetailsReviewsList';
import InstitutionDetailsSpecialtiesList from './specialties/InstitutionDetailsSpecialtiesList';

export default observer(function InstitutionDetailsContent() {
    const { t } = useTranslation();
    const { institutionStore: { setActiveMenuItem, activeMenuItem } } = useStore()
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
            <Menu pointing secondary style={{ maxWidth: '37rem' }}>
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