import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Checkbox, DropdownProps, Grid, Icon, Search } from 'semantic-ui-react';
import CustomSelectInput from '../../../../app/common/form/CustomSelectInput';
import { useStore } from '../../../../app/stores/store';
import LeafletControlGeocoder from './LeafletControlGeocoder';
import { geocoders } from 'leaflet-control-geocoder';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';

export default function InstitutionDetailsLocationForm() {

    const { commonStore, institutionStore, mapStore } = useStore();
    const {
        regionRegistry,
        getRegionById,
        selectedInstitution,
        getCityById } = institutionStore;

    const formik = useFormikContext();
    const [draggable, setDraggable] = useState<boolean>(false);
    const [center, setCenter] = useState<any>({ lat: selectedInstitution?.latitude, lng: selectedInstitution?.longtitude });
    const handleMarkerDragEnd = (event: any) => {
        setCenter({ lat: event.target._latlng.lat, lng: event.target._latlng.lng });
    };
    const { t, i18n } = useTranslation();

    return (
        <Grid>
            <Grid.Column width={8}>
                <Grid>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon name='marker' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={7}>
                            {t('Region') + ': '}
                            <CustomSelectInput
                                onChange={(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
                                    formik.getFieldHelpers('cityId').setValue('')
                                }}
                                placeholder={t('Select region')}
                                name='regionId'
                                options={Array.from(regionRegistry.values()).map(element => ({ text: element.name, value: element.id }))} />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            {t('City') + ': '}
                            <CustomSelectInput
                                onChange={(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
                                    mapStore.PeformGeocodingQuery(getCityById(data.value as number, formik.getFieldProps('regionId').value)?.name!, formik.getFieldProps('streetAddress').value)
                                        .then((result) => console.log(result))
                                }}
                                placeholder={t('Select city')}
                                name='cityId'
                                disabled={!!!formik.getFieldProps('regionId').value}
                                options={getRegionById(formik.getFieldProps('regionId').value)?.cities.map(element => ({ text: element.name, value: element.id }))
                                    .sort((a, b) => a.text.localeCompare(b.text)) || [{ text: 'Choose city', value: 0 }]} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon name='home' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            {t('Address') + ': '}
                            <Search
                                style={{ display: 'inline-block' }}
                                value={formik.getFieldProps('streetAddress').value}
                                results={mapStore.results && mapStore.results.map((x) => ({ title: x.name }))}
                                onSearchChange={(e, d) => {
                                    formik.getFieldHelpers('streetAddress').setValue(d.value);
                                    mapStore.PeformGeocodingQuery(getCityById(formik.getFieldProps('cityId').value as number, formik.getFieldProps('regionId').value)?.name!, d.value!)
                                        .then((result) => {console.log(result);})
                                }}
                                showNoResults={false} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon name='home' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            Зазначити координати самостійно:
                            <Checkbox value={draggable ? 'true' : 'false'} toggle onChange={() => setDraggable(!draggable)} />
                            Lat: {center.lat} Lng: {center.lng}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column width={8}>
                <MapContainer center={center} zoom={20} scrollWheelZoom={false} style={{ overflow: 'hidden', width: '100%', height: '440px' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {commonStore.editMode &&
                        <LeafletControlGeocoder
                            geocoder={mapStore.geocoder}
                            center={center}
                        />}
                    <Marker
                        draggable={draggable}
                        position={center}
                        eventHandlers={{
                            dragend: handleMarkerDragEnd,
                        }}
                    >
                        <Popup interactive>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </Grid.Column>
        </Grid>
    )
}