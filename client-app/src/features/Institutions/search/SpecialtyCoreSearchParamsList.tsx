import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import SpecialtyCoreSearchParamItem from "./SpecialtyCoreSearchParamItem";

export default observer(function SpecialtyCoreSearchParamsList() {
    const { specialtyStore } = useStore();
    const { loadSpecialtyCores, specialtyCoreRegistry } = specialtyStore;

    useEffect(() => {
        if (specialtyStore.specialtyCoreRegistry.size <= 1) specialtyStore.loadSpecialtyCores();
        return () => { }
    }, [specialtyCoreRegistry, loadSpecialtyCores])

    return (
        <Segment.Group divided>
            {specialtyStore.specialtyCoresByName.map((specialtyCore) => (
                <SpecialtyCoreSearchParamItem specialtyCore={specialtyCore} key={specialtyCore.id} />
            ))}
        </Segment.Group>
    )
})