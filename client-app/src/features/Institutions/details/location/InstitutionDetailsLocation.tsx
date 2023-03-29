import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Grid, Icon } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

export default function InstitutionDetailsLocation() {

    const { institutionStore } = useStore();
    const {
        selectedInstitution,
        getCityById,
        getRegionById } = institutionStore;
    const { t } = useTranslation();
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });

    return (
        <Grid style={{ width: isComputerOrTablet ? '95%' : '90%', margin: '0 auto' }}>
            <Grid.Row>
                <Icon name='point' color='blue' /> {selectedInstitution?.streetAddress},  {" "}
                {getCityById(selectedInstitution?.cityId!, selectedInstitution?.regionId!)?.name}, {" "}
                {getRegionById(selectedInstitution?.regionId!)?.name}
            </Grid.Row>
            <Grid.Row>
                <MapContainer
                    center={{ lat: selectedInstitution?.latitude! || 0, lng: selectedInstitution?.longtitude! || 0 }}
                    zoom={20}
                    scrollWheelZoom={false}
                    style={{ overflow: 'hidden', width: '100%', minHeight: '40rem' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={{ lat: selectedInstitution?.latitude! || 0, lng: selectedInstitution?.longtitude! || 0 }}>
                        <Popup>
                            {selectedInstitution?.name}, {" "}
                            {selectedInstitution?.streetAddress},  {" "}
                            {getCityById(selectedInstitution?.cityId!, selectedInstitution?.regionId!)?.name}, {" "}
                            {getRegionById(selectedInstitution?.regionId!)?.name}
                        </Popup>
                    </Marker>
                </MapContainer>
            </Grid.Row>
        </Grid>
    )
}