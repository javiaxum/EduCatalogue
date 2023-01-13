import { observer } from "mobx-react-lite";
import { Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import SpecialtyCoreSearchParamItem from "./SpecialtyCoreSearchParamItem";

export default observer(function SpecialtyCoreSearchParamsList() {
    const { specialtyStore } = useStore();

    return (
        <Segment.Group>
            {specialtyStore.specialtyCoresByName.map((specialtyCore) => (
                <SpecialtyCoreSearchParamItem specialtyCore={specialtyCore} key={specialtyCore.id} />
            ))}
        </Segment.Group>
    )
})