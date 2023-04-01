

import { useMap } from "react-leaflet";
import { observer } from "mobx-react-lite";

interface Props {
  center: any;
}

export default observer(function FlyTo({ center }: Props) {
  const map = useMap();
  map.flyTo(center);
  return null;
})