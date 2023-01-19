import { observer } from "mobx-react-lite";
import react from "react";
import { Divider, Grid, Header, Input, Search, Select } from "semantic-ui-react";
import { degreeOptions } from "../../../app/common/options/degreeOptions";
import { useStore } from "../../../app/stores/store";
import SearchParamItem from "./SearchParamItem";



export default observer(function SearchParamsList() {
    const { specialtyStore, institutionStore } = useStore();
    const {
        specialtyPredicate,
        citiesPredicate,
        toggleSpecialtyPredicateParam,
        toggleCityPredicateParam,
        citiesByName,
        setCityNameFilter,
        cityNameFilter,
        maxPrice,
        minPrice,
        setMaxPrice,
        setMinPrice, 
        pagination } = institutionStore;

    return (
        <Grid style={{ padding: '0.4rem' }}>
            <Header as='h4' content='Price' style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Grid.Column width={16} style={{ padding: '0' }}>
                <Input
                    label={'min'}
                    placeholder="0"
                    min={0}
                    name="min"
                    type="number"
                    style={{ width: '30%', padding: '2px' }}
                    value={minPrice} 
                    onChange={(e, d) => {
                        setMinPrice(d.value);
                    }} />
                <Input
                    label={'max'}
                    placeholder="0"
                    min={0}
                    name="max"
                    type="number"
                    style={{ width: '30%', marginLeft: '50px' }}
                    value={maxPrice}
                    onChange={(e, d) => {
                        setMaxPrice(d.value);
                    }} />
            </Grid.Column>
            <Header as='h4' content='Knowledge branch' style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Grid.Column style={{ padding: '0.4rem', height: '200px', overflowX: 'hidden' }} width={16}>
                {specialtyStore.branchesById.map((branch) => (
                    <SearchParamItem code={branch.id} name={branch.name} key={branch.id} checked={specialtyPredicate.get(branch.id)} togglePredicateParam={toggleSpecialtyPredicateParam} />
                ))}
            </Grid.Column>
            <Grid.Column width={16} style={{ padding: '0' }}>
                <Divider />
            </Grid.Column>
            <Header as='h4' content='Specialties' style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Grid.Column style={{ padding: '0.4rem', height: '200px', overflowX: 'hidden' }} width={16}>
                {specialtyStore.specialtyCoresByName.map((specialtyCore) => (
                    <SearchParamItem code={specialtyCore.id} name={specialtyCore.name} key={specialtyCore.id} checked={specialtyPredicate.get(specialtyCore.id)} togglePredicateParam={toggleSpecialtyPredicateParam} />
                ))}
            </Grid.Column>
            <Grid.Column width={16} style={{ padding: '0' }}>
                <Divider />
            </Grid.Column>
            <Header as='h4' content='Cities' style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Search
                value={cityNameFilter}
                showNoResults={false}
                onSearchChange={(e, d) => {
                    setCityNameFilter(d.value!);
                }} />
            <Grid.Column style={{ padding: '0.4rem', height: '200px', overflowX: 'hidden' }} width={16}>
                {cityNameFilter && cityNameFilter.length != 0 ? citiesByName.filter(city => city.name.toLocaleLowerCase().includes(cityNameFilter.toLocaleLowerCase())).map((city) => (
                    <SearchParamItem code={city.name} key={city.name} checked={citiesPredicate.get(city.name)} togglePredicateParam={toggleCityPredicateParam} />
                )) : (citiesByName.map((city) => (
                    <SearchParamItem code={city.name} key={city.name} checked={citiesPredicate.get(city.name)} togglePredicateParam={toggleCityPredicateParam} />
                ))
                )}
            </Grid.Column>
            <Header as='h4' content='Degree' style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Select
                options={degreeOptions}
            />
        </Grid>
    )
})