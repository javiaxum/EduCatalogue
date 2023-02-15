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
import { geocoders } from 'leaflet-control-geocoder';
import { debounce } from 'lodash';

export default function InstitutionDetailsLocationForm() {

    const { commonStore: { editMode }, institutionStore } = useStore();
    const {
        regionRegistry,
        getRegionById,
        selectedInstitution,
        setTitleImage,
        getCityById,
        uploading } = institutionStore;

    const formik = useFormikContext();
    const [center, setCenter] = useState<any>({lat: 50, lng: 30});
    const geocoder = new geocoders.Nominatim();
    const debouncedPerformGeocodingQuery = debounce((city: string, street: string) => {
        geocoder.geocode(`Ukraine, ${city}, ${street}`, (result) => { setCenter(result[0].center) }) //
    }, 1000)
    return (
        <Grid>
            <Grid.Column width={8}>
                <Grid>
                    <Grid.Row style={{ padding: '1rem 0 0 0' }}>
                        <Grid.Column width={1}>
                            <Icon name='marker' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={7}>
                            Region:
                            <CustomSelectInput
                                onChange={(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
                                    formik.getFieldHelpers('cityId').setValue('')
                                }}
                                placeholder={'Select region'}
                                name='regionId'
                                options={Array.from(regionRegistry.values()).map(element => ({ text: element.name, value: element.id }))} />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            City:
                            <CustomSelectInput
                                onChange={(event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
                                    console.log(data.value as number);
                                    debouncedPerformGeocodingQuery(getCityById(data.value as number, formik.getFieldProps('regionId').value)?.name!, formik.getFieldProps('streetAddress').value)
                                }}
                                placeholder={'Select city'}
                                name='cityId'
                                disabled={!!!formik.getFieldProps('regionId').value}
                                options={getRegionById(formik.getFieldProps('regionId').value)?.cities.map(element => ({ text: element.name, value: element.id }))
                                    .sort((a, b) => a.text.localeCompare(b.text)) || [{ text: 'Choose city', value: 0 }]} />
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Icon name='home' size='large' color='blue' />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            Address:
                            <CustomTextInput placeholder='Address' name='streetAddress' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column width={8}>
                <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ overflow: 'hidden', width: '100%', height: '440px' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {editMode &&
                        <LeafletControlGeocoder
                            street={selectedInstitution?.streetAddress!}
                            city={getCityById(selectedInstitution?.cityId!, selectedInstitution?.regionId!)?.name!}
                            callback={(e) => {
                                formik.getFieldHelpers('latitude').setValue(e.geocode.center.lat)
                                formik.getFieldHelpers('longtitude').setValue(e.geocode.center.lng)
                            }}
                            geocoder={geocoder} />}
                    <Marker position={center}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </Grid.Column>
        </Grid>
    )
}