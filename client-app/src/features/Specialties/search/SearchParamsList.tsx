import { observer } from "mobx-react-lite";
import react from "react";
import { Divider, Grid, Header, Input, Search, Select } from "semantic-ui-react";
import { degreeOptions } from "../../../app/common/options/degreeOptions";
import { Branch } from "../../../app/models/branch";
import { SpecialtyCore } from "../../../app/models/specialtyCore";
import { useStore } from "../../../app/stores/store";
import SearchParamItem from "../../Institutions/search/SearchParamItem";



export default observer(function SearchParamsList() {
    const { specialtyStore, institutionStore } = useStore();
    const {
        specialtyPredicate,
        branchPredicate,
        citiesPredicate,
        toggleSpecialtyPredicateParam,
        toggleCityPredicateParam,
        toggleBranchPredicateParam,
        citiesByName,
        setCityNameFilter,
        cityNameFilter,
        maxPrice,
        minPrice,
        setMaxPrice,
        setMinPrice,
        pagination } = institutionStore;

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
                {specialtyStore.branchesById.sort(compareFnBr).map((branch) => (
                    <SearchParamItem code={branch.id} name={branch.name} key={branch.id} checked={branchPredicate.get(branch.id)} togglePredicateParam={toggleBranchPredicateParam} />
                ))}
            </Grid.Column>
            <Grid.Column width={16} style={{ padding: '0' }}>
                <Divider />
            </Grid.Column>
            <Header as='h4' content='Specialties' style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Grid.Column style={{ padding: '0.4rem', height: '200px', overflowX: 'hidden' }} width={16}>
                {specialtyStore.specialtyCoresByName.sort(compareFnSC).map((specialtyCore) => (
                    <SearchParamItem code={specialtyCore.id} name={specialtyCore.name} key={specialtyCore.id} checked={specialtyPredicate.get(specialtyCore.id)} togglePredicateParam={toggleSpecialtyPredicateParam} />
                ))}
            </Grid.Column>
            <Grid.Column width={16} style={{ padding: '0' }}>
                <Divider />
            </Grid.Column>
            <Header as='h4' content='Degree' style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Grid.Column width={16} style={{ padding: '0' }}>
                <Select
                    options={degreeOptions} />
            </Grid.Column>
        </Grid>
    )
})