import { observer } from "mobx-react-lite";
import react, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Divider, Dropdown, DropdownItemProps, Grid, Header, Input, Label, Search, Select } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import Slider from "@mui/material/Slider";

export default observer(function SearchParamsList() {
    const { specialtyStore, institutionStore, commonStore } = useStore();
    const {
        selectedSpecialties,
        selectedBranches,
        selectedDegreeId: selectedDegree,
        setSelectedBranches,
        setSelectedSpecialties,
        setTuitionRange,
        tuitionRange,
        setDegreePredicate,
        setSelectedCities,
        populatedCitiesByName,
        selectedCities } = institutionStore;

    const { branchesById } = specialtyStore;

    const cityOptions: DropdownItemProps[] = populatedCitiesByName.map(city => ({
        key: city.id,
        text: city.name,
        value: city.id,
    }));

    const specialtyOptions: DropdownItemProps[] = specialtyStore.specialtyCoresById.map(specialty => ({
        key: specialty.id,
        text: `${specialty.id} ${specialty.name}`,
        value: specialty.id,
    }));

    const branchOptions: DropdownItemProps[] = branchesById.map(branch => ({
        key: branch.id,
        text: `${branch.id} ${branch.name}`,
        value: branch.id,
    }));

    const { t } = useTranslation();
    
    return (
        <Grid style={{ padding: '0.4rem' }}>
            <Header as='h4' content={t('Tuition')} style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Grid.Column width={16} style={{ padding: '0' }} textAlign="center">
                <Slider
                    style={{ width: '80%', color: 'rgb(38, 94, 213)' }}
                    getAriaLabel={() => 'Tuition range'}
                    value={tuitionRange}
                    onChange={(e, value) => { if (Array.isArray(value)) setTuitionRange(value) }}
                    valueLabelDisplay="auto"
                    step={10}
                    min={1000}
                    max={300000} />
                <Label size="large">
                    {tuitionRange[0]} USD - {tuitionRange[1]} USD
                </Label>
            </Grid.Column>
            <Grid.Column width={16} style={{ padding: '0' }}>
                <Divider />
            </Grid.Column>
            <Header as='h4' content={t('Knowledge branch')} style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Dropdown
                placeholder={t('Select branch') as string}
                fluid
                multiple
                search
                selection
                clearable
                value={selectedBranches}
                options={branchOptions}
                onChange={(e, data) => {
                    let values = data.value as string[];
                    setSelectedBranches(data.value as string[])
                    if (selectedSpecialties?.length != 0 && values.length !== 0) {
                        setSelectedSpecialties(selectedSpecialties.filter((x) => values.includes(x.slice(0, 2))));
                    }
                }}
            />
            <Header as='h4' content={t('Specialty')} style={{ padding: '1rem 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Dropdown
                placeholder={t('Select specialty') as string}
                fluid
                multiple
                search
                selection
                clearable
                value={selectedSpecialties}
                options={specialtyOptions}
                onChange={(event, data) => {
                    let values = data.value as string[];
                    setSelectedSpecialties(data.value as string[])
                    if (selectedBranches?.length != 0 && values.length !== 0) {
                        setSelectedBranches(selectedBranches.filter((x) => values.find((s) => s.slice(0, 2) == x)));
                    }
                }}
            />
            <Header as='h4' content={t('Location')} style={{ padding: '1rem 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Dropdown
                placeholder={t('Select city') as string}
                fluid
                multiple
                search
                selection
                clearable
                value={selectedCities}
                options={cityOptions}
                onChange={(event: React.SyntheticEvent<HTMLElement>, data: any) => setSelectedCities(data.value)}
            />
            <Header as='h4' content={t('Degree')} style={{ padding: '1rem 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Select
                style={{ margin: '0 0 3rem 0' }}
                fluid
                clearable
                placeholder={t('Select degree') as string}
                name='degree'
                value={selectedDegree}
                options={t("degreeOptions", { returnObjects: true })}
                onChange={(e, d) => setDegreePredicate(d.value as string)} />
        </Grid>
    )
})