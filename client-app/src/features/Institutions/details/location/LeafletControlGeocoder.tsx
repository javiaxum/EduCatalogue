

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import Geocoder, { geocoders } from 'leaflet-control-geocoder';
import { MarkGeocodeEvent } from "leaflet-control-geocoder/dist/control";

interface Props {
  city: string;
  street: string;
  geocoder: geocoders.Nominatim;
  callback: (e: MarkGeocodeEvent) => void;
}

export default function LeafletControlGeocoder({ city, street, geocoder }: Props) {
  const map = useMap();

  useEffect(() => {
    new Geocoder({
      query: `${city}, ${street}`,
      collapsed: false,
      geocoder: geocoder,
      position: 'topleft',
    })//
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        console.log(e.geocode.center)
        L.marker(latlng)
          .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
        map.fitBounds(e.geocode.bbox);
      })//
      .addTo(map);
  }, []);

  return null;
}