import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Checkbox, DropdownProps, Grid, Icon, Search } from 'semantic-ui-react';
import CustomSelectInput from '../../../../app/common/form/CustomSelectInput';
import { useStore } from '../../../../app/stores/store';
import LeafletControlGeocoder from './LeafletControlGeocoder';
import { useTranslation } from 'react-i18next';
import LoadingComponent from '../../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';

export default observer(function InstitutionDetailsLocationForm() {

    const { commonStore, institutionStore, mapStore } = useStore();
    const {
        regionRegistry,
        getRegionById,
        selectedInstitution,
        getCityById } = institutionStore;

    const {
        setCity,
        setStreet,
        street,
        city,
        loading,
        setCenter,
        center } = mapStore;

    useEffect(() => {
        if (!street) setStreet(formik.getFieldProps('streetAddress').value)
        if (!city) setCity(getCityById(formik.getFieldProps('cityId').value, formik.getFieldProps('regionId').value)?.name!)
        if (center != null) {
            formik.getFieldHelpers('latitude').setValue(center?.lat);
            formik.getFieldHelpers('longtitude').setValue(center?.lng);
        }
    }, [setCenter, center, setStreet, street, setCity, city])

    const formik = useFormikContext();
    const [draggable, setDraggable] = useState<boolean>(false);
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
                                onChange={() => {
                                    formik.getFieldHelpers('cityId').setValue('')
                                }}
                                placeholder={t('Select region')}
                                name='regionId'
                                options={Array.from(regionRegistry.values()).map(element => ({ text: element.name, value: element.id }))} />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            {t('City') + ': '}
                            <CustomSelectInput
                                onChange={(event, data: DropdownProps) => {
                                    setCity(getCityById(data.value as number, formik.getFieldProps('regionId').value)?.name!)
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
                                // results={mapStore.geocodingResultOptions}
                                onSearchChange={(e, d) => {
                                    formik.getFieldHelpers('streetAddress').setValue(d.value);
                                    mapStore.setStreet(d.value!);
                                }}
                                showNoResults={false}
                                // onResultSelect={(e, d) => {
                                //     console.log(d.value!)
                                // }}
                                loading={loading} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon name='home' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            Зазначити координати самостійно:
                            <Checkbox
                                value={draggable ? 'true' : 'false'}
                                toggle
                                onChange={() => setDraggable(!draggable)} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column width={8}>
                <MapContainer center={center || { lat: selectedInstitution?.latitude || 49, lng: selectedInstitution?.longtitude || 31 }} zoom={20} scrollWheelZoom={false} style={{ overflow: 'hidden', width: '100%', height: '440px' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {commonStore.editMode &&
                        <LeafletControlGeocoder
                            center={center || { lat: selectedInstitution?.latitude || 49, lng: selectedInstitution?.longtitude || 31 }}
                        />}
                    <Marker
                        draggable={draggable}
                        position={center || { lat: selectedInstitution?.latitude || 49, lng: selectedInstitution?.longtitude || 31 }}
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
})