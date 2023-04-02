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
import { useFormikContext } from 'formik';
import { Link } from 'react-router-dom';
import ToggleInstitutionManagerForm from '../../identity/ToggleInstitutionManagerForm';

export default observer(function InstitutionDetailsContent() {
    const { t } = useTranslation();
    const { institutionStore, commonStore, userStore, modalStore, profileStore } = useStore();
    const { setActiveMenuItem, activeMenuItem, toggleVisibility, selectedInstitution, loading, loadingInitial } = institutionStore;
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });
    const visible = selectedInstitution?.visible!;
    const formik = useFormikContext();

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
                <Menu.Item onClick={() => toggleVisibility(selectedInstitution?.id!)}>
                    {(!loading && !loadingInitial) &&
                        <>
                            <Icon name={visible ? 'eye slash' : 'eye'} />
                            {t(visible ? 'Hide institution' : 'Show institution')}
                        </>}
                </Menu.Item>
                {profileStore.isOperator && <Menu.Item onClick={() => modalStore.openModalMini(<ToggleInstitutionManagerForm />)}>
                    {(!loading && !loadingInitial) &&
                        <Icon name='user' />}
                </Menu.Item>}
            </Menu>

            {components[items.indexOf(activeMenuItem)]}
        </>
    )
})