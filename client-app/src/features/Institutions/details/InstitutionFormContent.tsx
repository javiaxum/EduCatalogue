import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Button, Icon, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import InstitutionDetailsInfoForm from '../form/InstitutionDetailsInfoForm';
import InstitutionDetailsGallery from './gallery/InstitutionDetailsGallery';
import InstitutionDetailsLocationForm from './location/InstitutionDetailsLocationForm';
import InstitutionDetailsReviewsList from './reviews/InstitutionDetailsReviewsList';
import InstitutionDetailsSpecialtiesList from './specialties/InstitutionDetailsSpecialtiesList';

export default observer(function InstitutionDetailsContent() {
    const { t } = useTranslation();
    const { institutionStore, commonStore } = useStore();
    const { setActiveMenuItem, activeMenuItem, toggleVisibility, selectedInstitution, loading } = institutionStore;
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });
    const visible = selectedInstitution?.visible!;

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
                <Menu.Item loading={loading} onClick={() => toggleVisibility(selectedInstitution?.id!)}>
                    <Icon name={visible ? 'eye slash' : 'eye'} />
                    {t(visible ? 'Hide institution' : 'Show institution')}
                </Menu.Item>
            </Menu>
            {components[items.indexOf(activeMenuItem)]}
        </>
    )
})