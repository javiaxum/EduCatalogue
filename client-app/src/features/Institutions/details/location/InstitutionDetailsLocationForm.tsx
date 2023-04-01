import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Checkbox, DropdownProps, Grid, Search, Table } from 'semantic-ui-react';
import CustomSelectInput from '../../../../app/common/form/CustomSelectInput';
import { useStore } from '../../../../app/stores/store';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import TableItem from '../TableItem';
import { useMediaQuery } from 'react-responsive';
import FlyTo from './FlyTo';

export default observer(function InstitutionDetailsLocationForm() {

    const { commonStore, institutionStore, mapStore } = useStore();
    const {
        regionRegistry,
        getRegionById,
        selectedInstitution,
        getCityById, loadingInitial } = institutionStore;

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

    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    const { t } = useTranslation();

    return (
        <Grid style={{ margin: isMobile ? 0 : '' }}>
            <Grid.Column width={isMobile ? 16 : 8}>
                <Grid>
                    <Grid.Row>
                        <Table basic='very' compact unstackable>
                            <Table.Body>
                                <TableItem
                                    loading={(loadingInitial)}
                                    icon='point'
                                    label={t('Region')}
                                    content={
                                        <CustomSelectInput
                                            onChange={() => formik.getFieldHelpers('cityId').setValue('')}
                                            placeholder={t('Select region')}
                                            name='regionId'
                                            options={Array.from(regionRegistry.values()).map(element => ({ text: element.name, value: element.id }))} />
                                    } />
                                <TableItem
                                    loading={(loadingInitial)}
                                    icon='point'
                                    label={t('City')}
                                    content={
                                        <CustomSelectInput
                                            onChange={(event, data: DropdownProps) => setCity(getCityById(data.value as number, formik.getFieldProps('regionId').value)?.name!)}
                                            placeholder={t('Select city')}
                                            name='cityId'
                                            disabled={!!!formik.getFieldProps('regionId').value}
                                            options={getRegionById(formik.getFieldProps('regionId').value)?.cities.map(element => ({ text: element.name, value: element.id }))
                                                .sort((a, b) => a.text.localeCompare(b.text)) || [{ text: 'Choose city', value: 0 }]} />
                                    } />
                                <TableItem
                                    loading={(loadingInitial)}
                                    icon='home'
                                    label={t('Address')}
                                    content={
                                        <Search
                                            style={{ display: 'inline-block' }}
                                            value={formik.getFieldProps('streetAddress').value}
                                            onSearchChange={(e, d) => {
                                                formik.getFieldHelpers('streetAddress').setValue(d.value);
                                                mapStore.setStreet(d.value!);
                                            }}
                                            showNoResults={false}
                                            loading={loading} />} />
                                <TableItem
                                    loading={(loadingInitial)}
                                    icon='point'
                                    label={t('Drag the marker')}
                                    content={
                                        <Checkbox
                                            value={draggable ? 'true' : 'false'}
                                            toggle
                                            onChange={() => setDraggable(!draggable)} />} />
                            </Table.Body>
                        </Table>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column width={isMobile ? 16 : 8}>
                <MapContainer center={center || { lat: selectedInstitution?.latitude || 49, lng: selectedInstitution?.longtitude || 31 }} zoom={20} scrollWheelZoom={false} style={{ overflow: 'hidden', width: '100%', height: '25rem' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker
                        draggable={draggable}
                        position={center || { lat: selectedInstitution?.latitude || 49, lng: selectedInstitution?.longtitude || 31 }}
                        eventHandlers={{ dragend: handleMarkerDragEnd }}>
                        <FlyTo center={center || { lat: selectedInstitution?.latitude || 49, lng: selectedInstitution?.longtitude || 31 }} />
                        <Popup>
                            {selectedInstitution?.name}, {" "}
                            {selectedInstitution?.streetAddress},  {" "}
                            {getCityById(selectedInstitution?.cityId!, selectedInstitution?.regionId!)?.name}, {" "}
                            {getRegionById(selectedInstitution?.regionId!)?.name}
                        </Popup>
                    </Marker>
                </MapContainer>
            </Grid.Column>
        </Grid>
    )
})