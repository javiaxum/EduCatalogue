import { observer } from "mobx-react-lite";
import react from "react";
import { Divider, Grid, Header, Input, Label, Search, Select } from "semantic-ui-react";
import CustomSelectInput from "../../../app/common/form/CustomSelectInput";
import { degreeOptions } from "../../../app/common/options/degreeOptions";
import { Branch } from "../../../app/models/branch";
import { SpecialtyCore } from "../../../app/models/specialtyCore";
import { useStore } from "../../../app/stores/store";
import SearchParamItem from "./SearchParamItem";



export default observer(function SearchParamsList() {
    const { specialtyStore, institutionStore } = useStore();
    const {
        specialtyPredicate,
        branchPredicate,
        citiesPredicate,
        toggleSpecialtyPredicateParam,
        toggleBranchPredicateParam,
        toggleCityPredicateParam,
        populatedCitiesByName: citiesByName,
        setCityNameFilter,
        cityNameSearchValue: cityNameFilter,
        maxPrice,
        minPrice,
        setMaxPrice,
        setMinPrice,
        setDegreePredicate } = institutionStore;


    function compareFnSC(a: SpecialtyCore, b: SpecialtyCore) {
        return !institutionStore.specialtyPredicate.has(a.id) ? !institutionStore.specialtyPredicate.has(b.id) ? 0 : 1 : !institutionStore.specialtyPredicate.has(b) ? -1 : 0;
    }
    function compareFnBr(a: Branch, b: Branch) {
        return !institutionStore.branchPredicate.has(a.id) ? !institutionStore.branchPredicate.has(b.id) ? 0 : 1 : !institutionStore.branchPredicate.has(b) ? -1 : 0;
    }

    return (
        <Grid style={{ padding: '0.4rem' }}>
            <Header as='h4' content='Price' style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Grid.Column width={16} style={{ padding: '0' }}>
                <Label 
                    content='from' style={{padding: '12px'}}/>                
                <Input
                    placeholder="0"
                    name="min"
                    style={{ width: '7rem' }}
                    value={minPrice}
                    onChange={(e, d) => {
                        setMinPrice(d.value);
                    }} />
                <Label 
                    content='till' style={{padding: '12px'}}/>
                <Input
                    placeholder="0"
                    name="max"
                    style={{ width: '7rem' }}
                    value={maxPrice}
                    onChange={(e, d) => {
                        setMaxPrice(d.value);
                    }} />
            </Grid.Column>
            <Header as='h4' content='Knowledge branch' style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Grid.Column style={{ padding: '0.4rem', height: '200px', overflowX: 'hidden' }} width={16}>
                {specialtyStore.branchesById.sort(compareFnBr).map((branch) => (
                    <SearchParamItem
                        id={branch.id}
                        name={`${branch.id} ${branch.name}`}
                        key={branch.id}
                        checked={branchPredicate.get(branch.id)}
                        togglePredicateParam={toggleBranchPredicateParam} />
                ))}
            </Grid.Column>
            <Grid.Column width={16} style={{ padding: '0' }}>
                <Divider />
            </Grid.Column>
            <Header as='h4' content='Specialties' style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Grid.Column style={{ padding: '0.4rem', height: '200px', overflowX: 'hidden' }} width={16}>
                {specialtyStore.specialtyCoresById.filter((s) => branchPredicate.size === 0 || branchPredicate.has(s.id.slice(0, 2))).sort(compareFnSC).map((specialtyCore) => (
                    <SearchParamItem
                        id={specialtyCore.id}
                        name={`${specialtyCore.id} ${specialtyCore.name}`}
                        key={specialtyCore.id}
                        checked={specialtyPredicate.get(specialtyCore.id)}
                        togglePredicateParam={toggleSpecialtyPredicateParam} />
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
                {citiesByName.filter(city => cityNameFilter.length === 0 || city.name.toLocaleLowerCase().includes(cityNameFilter.toLocaleLowerCase())).map((city) => (
                    <SearchParamItem id={city.id} name={city.name} key={city.id} checked={citiesPredicate.get(city.name)} togglePredicateParam={toggleCityPredicateParam} />
                ))}
            </Grid.Column>
            <Header as='h4' content='Degree' style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Grid.Column style={{ padding: '0.4rem', height: '200px', overflowX: 'hidden' }} width={16}>
                <Select
                    clearable
                    placeholder={'Select degree'}
                    name='degree'
                    options={degreeOptions}
                    onChange={(e, d) => setDegreePredicate(d.value as string)} />
            </Grid.Column>
        </Grid>
    )
})