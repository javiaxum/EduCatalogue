import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Grid, Header, Icon, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import InstitutionDetailsInfoPlaceholder from './InstitutionDetailsInfoPlaceholder';

export default observer(function InstitutionDetailsInfo() {

    const { institutionStore } = useStore();
    const {
        getCityById,
        selectedInstitution, loading } = institutionStore;
    const { t } = useTranslation();
    return (
        <>
            {loading
                ? <InstitutionDetailsInfoPlaceholder />
                : <>
                    <Header
                        as='h1'
                        content={t('Overview')} />
                    {/* <Grid style={{ margin: 0 }}>
                        <Grid.Column width={10}>
                            <Grid style={{ color: '#444', padding: '0' }} verticalAlign='middle'>
                                <Grid.Row>
                                    <Grid.Column width={1}>
                                        <Icon size='large' color='blue' name='info' />
                                    </Grid.Column>
                                    <Grid.Column width={14}>
                                        {t('Description') + ': '}
                                        <p>{selectedInstitution?.description}</p>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={1}>
                                        <Icon size='large' color='blue' name='graduation' />
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        {t("Student count") + ': '}
                                        {selectedInstitution?.studentCount}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={1}>
                                        <Icon name='marker' size='large' color='blue' />
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        {selectedInstitution && getCityById(selectedInstitution.cityId, selectedInstitution.regionId)?.name}, {selectedInstitution?.streetAddress}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={1}>
                                        <Icon name='chain' size='large' color='blue' />
                                    </Grid.Column>
                                    <Grid.Column width={14}>
                                        {t('Homepage') + ': '}
                                        {selectedInstitution && <a href={`https://${selectedInstitution.siteURL}`} target="_blank">  {selectedInstitution.siteURL}</a>}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={1}>
                                        <Icon name='phone' size='large' color='blue' />
                                    </Grid.Column>
                                    <Grid.Column width={14}>
                                        {t('Contact information') + ': '}
                                        {selectedInstitution?.contactInformation}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            {selectedInstitution && <Image
                                src={selectedInstitution.images.find((x) => x.id === selectedInstitution.titleImageId)?.url || '/assets/institutionTitleImagePlaceholder.png'}
                                style={{ objectFit: 'cover', maxHeight: '26rem', maxWidth: '26rem', borderRadius: '30px' }} />}
                        </Grid.Column>
                    </Grid> */}
                </>}
        </>
    )
})