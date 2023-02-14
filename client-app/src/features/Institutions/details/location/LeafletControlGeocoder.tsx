

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import Geocoder from 'leaflet-control-geocoder';

// shape of the props
// {
//  positionInfos: [{address: "some address"}]
// }

export default function LeafletControlGeocoder() {
  const map = useMap();

  
  useEffect(() => {
    new Geocoder({
      geocoder: new geocoders.Nominatim(),
      position: 'topleft',
    }).addTo(map);
  }, []);

  return null;
}