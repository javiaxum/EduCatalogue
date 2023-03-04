import { geocoder, geocoders } from "leaflet-control-geocoder";
import { debounce } from "lodash";
import { makeAutoObservable, reaction } from "mobx";
import { number } from "yup";
import { ServerError } from "../models/serverError";
import { store } from "./store";


export default class MapStore {
    results: any[] = [];
    city: string = '';
    street: string = '';
    center: { lat: number; lng: number } | null = null;
    loading: boolean = false;
    hasTriggered = 0;
    constructor() {
        makeAutoObservable(this);
        reaction(
            () => [
                this.city,
                this.street],
            () => {
                if (this.hasTriggered > 1) {
                    this.debouncedGeocodingQuery();
                } else {
                    this.hasTriggered++;
                }
            },
            { fireImmediately: true })

    }

    get geocodingResultOptions() {
        return this.results.slice(0, 3).map((x) => ({ title: x.display_name }));
    }

    get firstResult() {
        return this.results[0];
    }

    setCenter = (value: any) => {
        this.center = value;
    }
    setResults = (value: any[]) => {
        this.results = value;
        console.log(this.results)
    }
    setCity = (name: string) => {
        this.city = name;
    }
    setStreet = (name: string) => {
        this.street = name;
    }

    setLoading = (value: boolean) => {
        this.loading = value;
    }

    debouncedGeocodingQuery = debounce(() => {
        this.GeocodingQuery(this.city, this.street);
    }, 800);

    GeocodingQuery = async (city: string, street: string) => {
        this.setLoading(true);
        try {
            const result = await fetch(`https://nominatim.openstreetmap.org/search?q=${city},${street}&format=json`, {
                headers: {
                    "accept-language": "uk",
                    "X-OSM-CountryCode": "uk",
                },
            })
            const data = await result.json();
            this.setResults([]);
            this.setResults(data);
            this.setCenter({ lat: data[0].lat, lng: data[0].lon });
            this.setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }

    }
    // this.geocoder.geocode(`${city}, ${street}`, (result) => {
    //     this.setResults(result);



}