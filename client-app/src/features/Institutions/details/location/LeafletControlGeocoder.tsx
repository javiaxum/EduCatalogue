

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import Geocoder, { geocoders } from 'leaflet-control-geocoder';
import { MarkGeocodeEvent } from "leaflet-control-geocoder/dist/control";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";

interface Props {
  city: string;
  street: string;
  geocoder: geocoders.Nominatim;
  center: L.LatLng;
}

export default observer(function LeafletControlGeocoder({ city, street, geocoder, center }: Props) {
  const map = useMap();
  const { institutionStore } = useStore();
  map.flyTo(center);
  console.log(center)

  useEffect(() => {
    // new Geocoder({
    //   query: `${city}, ${street}`,
    //   collapsed: false,
    //   geocoder: geocoder,
    //   position: 'topleft',
    // })
    //   .on("markgeocode", function (e) {
    //     var latlng = e.geocode.center;
    //     console.log(e.geocode.center)
    //     L.marker(latlng)
    //       .addTo(map)
    //       .bindPopup(e.geocode.name)
    //       .openPopup();
    //     map.fitBounds(e.geocode.bbox);

    //   })
    //   .addTo(map);
  }, []);

  return null;
})