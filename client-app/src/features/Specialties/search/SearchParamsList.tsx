import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Divider, Dropdown, DropdownItemProps, Grid, Header, Input, Label, Select } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function SearchParamsList() {
    const { specialtyStore } = useStore();
    const {
        branchesById,
        skillsById,
        selectedSpecialties,
        selectedBranches,
        selectedSkillIds,
        selectedLanguages,
        selectedStudyForms,
        selectedDegree,
        setSelectedBranches,
        setSelectedSpeialties,
        setSelectedSkillIds,
        setSelectedStudyForms,
        setSelectedLanguages,
        maxPrice,
        minPrice,
        setMaxPrice,
        setMinPrice,
        setDegreePredicate } = specialtyStore;

    const { t } = useTranslation();

    const languages = t("languageOptions", { returnObjects: true }) as [{ text: string; value: string }]
    const studyForms = t("studyFormOptions", { returnObjects: true }) as [{ text: string; value: number }]

    let specialtyOptions: DropdownItemProps[] = specialtyStore.specialtyCoresById.map(specialty => ({
        key: specialty.id,
        text: `${specialty.id} ${specialty.name}`,
        value: specialty.id,
    }));
    const branchOptions: DropdownItemProps[] = branchesById.map(branch => ({
        key: branch.id,
        text: `${branch.id} ${branch.name}`,
        value: branch.id,
    }));
    const skillOptions: DropdownItemProps[] = skillsById.map(skill => ({
        key: skill.id,
        text: skill.name,
        value: skill.id,
    }));


    return (
        <Grid style={{ padding: '0.4rem' }}>
            <Header as='h4' content={t('Price')} style={{ padding: '0 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Grid.Column width={16} style={{ padding: '0' }}>
                <Label
                    content={t('from')} style={{ padding: '12px' }} />
                <Input
                    placeholder="0"
                    name="min"
                    style={{ minWidth: '5rem', maxWidth: '6rem' }}
                    value={minPrice}
                    onChange={(e, d) => {
                        setMinPrice(d.value);
                    }} />
                <Label
                    content={t('to')} style={{ padding: '12px' }} />
                <Input
                    placeholder="0"
                    name="max"
                    style={{ minWidth: '5rem', maxWidth: '6rem' }}
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
                placeholder={t('Select branch') as string}
                fluid
                multiple
                search
                selection
                clearable
                value={selectedBranches}
                options={branchOptions}
                onChange={(e, data) => {
                    setSelectedBranches(data.value as string[])
                    if (selectedSpecialties?.length !== 0 && selectedBranches.length !== 0) {
                        setSelectedSpeialties(selectedSpecialties.filter((x) => !selectedBranches.includes(x.slice(0, 2))));
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
                onChange={(event: React.SyntheticEvent<HTMLElement>, data: any) => setSelectedSpeialties(data.value)}
            />
            <Header as='h4' content={t('Degree')} style={{ padding: '1rem 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Select
                fluid
                clearable
                placeholder={t('Select degree') as string}
                name='degree'
                value={selectedDegree}
                options={t("degreeOptions", { returnObjects: true })}
                onChange={(e, d) => setDegreePredicate(d.value as string)} />
            <Header as='h4' content={t('Skills')} style={{ padding: '1rem 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Dropdown
                placeholder={t('Select skills') as string}
                fluid
                multiple
                search
                selection
                clearable
                value={selectedSkillIds}
                options={skillOptions}
                onChange={(event: React.SyntheticEvent<HTMLElement>, data: any) => setSelectedSkillIds(data.value)} />
            <Header as='h4' content={t('Languages')} style={{ padding: '1rem 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Dropdown
                placeholder={t('Select languages') as string}
                fluid
                multiple
                search
                selection
                clearable
                value={selectedLanguages}
                options={languages}
                onChange={(event: React.SyntheticEvent<HTMLElement>, data: any) => setSelectedLanguages(data.value)} />
            <Header as='h4' content={t('Study form')} style={{ padding: '1rem 0.5rem 0.2rem 1rem', margin: '1rem 0 0 0' }} />
            <Dropdown
                placeholder={t('Select study form') as string}
                fluid
                multiple
                search
                selection
                clearable
                value={selectedStudyForms}
                options={studyForms}
                onChange={(event: React.SyntheticEvent<HTMLElement>, data: any) => setSelectedStudyForms(data.value)} />
        </Grid>
    )
})