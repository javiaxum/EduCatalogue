import { observer } from "mobx-react-lite";
import { Divider, Dropdown, Grid, Header, Search, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import BranchSearchParamItem from "./BranchSearchParamItem";
import SpecialtyCoreSearchParamItem from "./SpecialtyCoreSearchParamItem";

export default observer(function SpecialtyCoreSearchParamsList() {
    const { specialtyStore } = useStore();

    return (
        <>
            <Grid style={{ padding: '0.4rem' }}>
                <Header as='h4' content='Knowledge branch' style={{ padding: '0 0.5rem 0.2rem 1rem' }} />
                <Grid.Column style={{ padding: '0.4rem', height: '300px', overflowX: 'hidden' }} width={16}>
                    {specialtyStore.branchesById.map((branch) => (
                        <BranchSearchParamItem branch={branch} key={branch.id} />
                    ))}
                </Grid.Column>
                <Grid.Column width={16} style={{padding: '0'}}>
                    <Divider />
                </Grid.Column>
                <Header as='h4' content='Specialties' style={{ padding: '0 0.5rem 0.2rem 1rem', marginTop: '0.5rem' }} />
                <Grid.Column style={{ padding: '0.4rem', height: '300px', overflowX: 'hidden' }} width={16}>
                    {specialtyStore.specialtyCoresByName.map((specialtyCore) => (
                        <SpecialtyCoreSearchParamItem specialtyCore={specialtyCore} key={specialtyCore.id} />
                    ))}
                </Grid.Column>
                {specialtyStore.specialtyCoresByName.map((specialtyCore) => (
                    <SpecialtyCoreSearchParamItem specialtyCore={specialtyCore} key={specialtyCore.id} />
                ))}
            </Grid>
        </>
    )
})