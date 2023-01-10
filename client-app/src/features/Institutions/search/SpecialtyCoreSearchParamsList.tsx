import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import SpecialtyCoreSearchParamItem from "./SpecialtyCoreSearchParamItem";

export default observer(function SpecialtyCoreSearchParamsList() {
    const { specialtyStore } = useStore();
    const { loadSpecialtyCores, specialtyCoreRegistry, specialtyCoresByNameSelectInput: specialtyCoresByName } = specialtyStore;

    useEffect(() => {
        return () => { }
    }, [specialtyCoreRegistry, loadSpecialtyCores])

    return (
        <Segment.Group>
            {specialtyStore.specialtyCoresByName.map((specialtyCore) => (
                <SpecialtyCoreSearchParamItem specialtyCore={specialtyCore} key={specialtyCore.id} />
            ))}
        </Segment.Group>
    )
})