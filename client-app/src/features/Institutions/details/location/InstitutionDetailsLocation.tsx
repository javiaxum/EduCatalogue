import { Wrapper } from '@googlemaps/react-wrapper';
import { useFormikContext } from 'formik';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { env } from 'process';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { DropdownProps, Grid, Icon } from 'semantic-ui-react';
import CustomSelectInput from '../../../../app/common/form/CustomSelectInput';
import CustomTextInput from '../../../../app/common/form/CustomTextInput';
import { useStore } from '../../../../app/stores/store';
import * as GeoSearch from 'leaflet-geosearch';
import LeafletControlGeocoder from './LeafletControlGeocoder';

export default function InstitutionDetailsLocation() {

    const { commonStore: { editMode }, institutionStore } = useStore();
    const {
        selectedInstitution,
        getCityById,
    } = institutionStore;

    console.log('LAT: ' + selectedInstitution?.latitude + ' LNG: ' + selectedInstitution?.longtitude)

    return (
        <Grid>
            <Grid.Column width={6}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={1}>
                            <Icon name='marker' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            City:
                            {selectedInstitution && getCityById(selectedInstitution.cityId, selectedInstitution.regionId)?.name}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={1}>
                            <Icon name='home' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={7}>
                            Address:
                            {selectedInstitution?.streetAddress}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column width={8}>
                <MapContainer
                    center={{ lat: selectedInstitution?.latitude || 0, lng: selectedInstitution?.longtitude! || 0 }}
                    zoom={20}
                    scrollWheelZoom={false}
                    style={{ overflow: 'hidden', width: '100%', height: '440px' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={{ lat: selectedInstitution?.latitude! || 0, lng: selectedInstitution?.longtitude! || 0 }}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </Grid.Column>
            <Grid.Column width={2}/>
        </Grid>
    )
}