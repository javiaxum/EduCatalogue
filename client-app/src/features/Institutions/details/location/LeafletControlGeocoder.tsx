

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import Geocoder, { geocoders } from 'leaflet-control-geocoder';
import { MarkGeocodeEvent } from "leaflet-control-geocoder/dist/control";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { debounce, throttle } from "lodash";

interface Props {
  geocoder: geocoders.Nominatim;
  center: L.LatLng;
}

export default observer(function LeafletControlGeocoder({ geocoder, center }: Props) {
  const map = useMap();
  map.flyTo(center);
  return null;
})