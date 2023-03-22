import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Grid, Icon } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';
import { useTranslation } from 'react-i18next';

export default function InstitutionDetailsLocation() {

    const { institutionStore } = useStore();
    const {
        selectedInstitution,
        getCityById } = institutionStore;
    const { t } = useTranslation();

    return (
        <Grid style={{ margin: 0 }}>
            <Grid.Column width={8}>
                <Grid >
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='blue' />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        {t('City') + ': '}
                        {selectedInstitution && getCityById(selectedInstitution.cityId, selectedInstitution.regionId)?.name}
                    </Grid.Column>
                    <Grid.Column width={1}>
                        <Icon name='home' size='large' color='blue' />
                    </Grid.Column>
                    <Grid.Column width={7}>
                        {t('Address') + ': '}
                        {selectedInstitution?.streetAddress}
                    </Grid.Column>
                </Grid>
            </Grid.Column>
            <Grid.Column width={8}>
                <MapContainer
                    center={{ lat: selectedInstitution?.latitude! || 0, lng: selectedInstitution?.longtitude! || 0 }}
                    zoom={8}
                    scrollWheelZoom={false}
                    style={{ overflow: 'hidden', width: '40rem', height: '30rem' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={{ lat: selectedInstitution?.latitude! || 0, lng: selectedInstitution?.longtitude! || 0 }}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </Grid.Column>
        </Grid>
    )
}