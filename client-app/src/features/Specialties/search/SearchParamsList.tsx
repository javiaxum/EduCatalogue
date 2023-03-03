import { observer } from "mobx-react-lite";
import react from "react";
import { useTranslation } from "react-i18next";
import { Divider, Dropdown, DropdownItemProps, Grid, Header, Input, Label, Search, Select } from "semantic-ui-react";
import CustomSelectInput from "../../../app/common/form/CustomSelectInput";
import { Branch } from "../../../app/models/branch";
import { SpecialtyCore } from "../../../app/models/specialtyCore";
import { useStore } from "../../../app/stores/store";



export default observer(function SearchParamsList() {
    const { specialtyStore, institutionStore } = useStore();
    const {
        branchesById,
        selectedSpecialties,
        selectedBranches,
        selectedDegree,
        setSelectedBranches,
        setSelectedSpeialties,
        maxPrice,
        minPrice,
        setMaxPrice,
        setMinPrice,
        setDegreePredicate } = specialtyStore;

    let filteredSpecialties = specialtyStore.specialtyCoresById
        .filter((specialty) => selectedBranches.length === 0 || selectedBranches.find((branchId) => branchId == specialty.id.slice(0, 2)))


    let specialtyOptions: DropdownItemProps[] = filteredSpecialties.map(specialty => ({
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
            <Header as='h4' content={t('Price')} style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Grid.Column width={16} style={{ padding: '0' }}>
                <Label
                    content={t('from')} style={{ padding: '12px' }} />
                <Input
                    placeholder="0"
                    name="min"
                    style={{ width: '7rem' }}
                    value={minPrice}
                    onChange={(e, d) => {
                        setMinPrice(d.value);
                    }} />
                <Label
                    content={t('to')} style={{ padding: '12px' }} />
                <Input
                    placeholder="0"
                    name="max"
                    style={{ width: '7rem' }}
                    value={maxPrice}
                    onChange={(e, d) => {
                        setMaxPrice(d.value);
                    }} />
            </Grid.Column>
            <Grid.Column width={16} style={{ padding: '0' }}>
                <Divider />
            </Grid.Column>
            <Header as='h4' content={t('Knowledge branch')} style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Dropdown
                placeholder='State'
                fluid
                multiple
                search
                selection
                clearable
                value={selectedBranches}
                options={branchOptions}
                onChange={(e, data) => {
                    setSelectedBranches(data.value as string[])
                    if (selectedSpecialties?.length != 0 && selectedBranches.length != 0) {
                        setSelectedSpeialties(selectedSpecialties.filter((x) => !selectedBranches.includes(x.slice(0, 2))));
                    }
                }} />
            <Header as='h4' content={t('Specialty')} style={{ padding: '1rem 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Dropdown
                placeholder='State'
                fluid
                multiple
                search
                selection
                clearable
                value={selectedSpecialties}
                options={specialtyOptions}
                onChange={(event: React.SyntheticEvent<HTMLElement>, data: any) => setSelectedSpeialties(data.value)} />
            <Header as='h4' content={t('Degree')} style={{ padding: '1rem 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Grid.Column style={{ padding: '0', height: '200px', overflowX: 'hidden' }} width={16}>
                <Select
                    fluid
                    clearable
                    placeholder={t('Select degree').toString()}
                    name='degree'
                    value={selectedDegree}
                    options={t("degreeOptions", { returnObjects: true })}
                    onChange={(e, d) => setDegreePredicate(d.value as string)} />
            </Grid.Column>
        </Grid>
    )
})