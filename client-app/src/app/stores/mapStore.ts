import { geocoder, geocoders } from "leaflet-control-geocoder";
import { debounce } from "lodash";
import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";
import { store } from "./store";


export default class MapStore {
    results: geocoders.GeocodingResult[] = [];
    geocoder = new geocoders.Nominatim({
        geocodingQueryParams: {
            country: 'Ukraine',
        }
    });

    constructor() {
        makeAutoObservable(this);

        // reaction(
        //     () => ,
        //     token => {
        //         if (token) { localStorage.setItem('jwt', token); }
        //         else { localStorage.removeItem('jwt'); }
        //     }
        // )
    }

    get firstResult() {
        return this.results[0];
    }

    setResults = (value: geocoders.GeocodingResult[]) => {
        this.results = value;
    }

    PeformGeocodingQuery = (city: string, street: string) => 
        fetch(`https://nominatim.openstreetmap.org/search?q=${city},${street}&format=json`)
            .then((response) => response.json())
        // this.geocoder.geocode(`${city}, ${street}`, (result) => {
        //     this.setResults(result);
        //     formik.getFieldHelpers('latitude').setValue(result[0].center.lat);
        //     formik.getFieldHelpers('longtitude').setValue(result[0].center.lng);
    

    // deboucedPeformGeocodingQuery = debounce(this.PeformGeocodingQuery, 2400)

}