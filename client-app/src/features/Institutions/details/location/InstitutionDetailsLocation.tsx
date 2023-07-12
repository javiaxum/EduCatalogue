import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Grid, Icon } from 'semantic-ui-react';
import { useStore } from '../../../../app/stores/store';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import FlyTo from './FlyTo';

export default observer(function InstitutionDetailsLocation() {

    const { institutionStore, mapStore } = useStore();
    const {
        selectedInstitution,
        getCityById,
        getRegionById } = institutionStore;


    const { t } = useTranslation();
    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });

    useEffect(() => {
        mapStore.setCenter(null);
        mapStore.setCity('');
        mapStore.setStreet('');
    }, [])

    return (
        <Grid style={{ width: isComputerOrTablet ? '95%' : '100%', margin: '0 auto' }}>
            <Grid.Row>
                <Icon name='point' style={{ color: 'rgb(38, 94, 213)' }} /> {selectedInstitution?.streetAddress},  {" "}
                {getCityById(selectedInstitution?.cityId!, selectedInstitution?.regionId!)?.name}, {" "}
                {getRegionById(selectedInstitution?.regionId!)?.name}
            </Grid.Row>
            <Grid.Row>
                <MapContainer
                    center={{ lat: selectedInstitution?.latitude || 38.9, lng: selectedInstitution?.longtitude || -77 }}
                    zoom={20}
                    scrollWheelZoom={true}
                    style={{ overflow: 'hidden', width: '100%', minHeight: '40rem' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={{ lat: selectedInstitution?.latitude || 38.9, lng: selectedInstitution?.longtitude || -77 }}>
                        <FlyTo center={{ lat: selectedInstitution?.latitude || 38.9, lng: selectedInstitution?.longtitude || -77 }} />
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
})