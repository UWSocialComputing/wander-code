import L from "leaflet";
import { WtmEventType } from "./wtmEvent";

export const getPinIcon = (type: WtmEventType) => {
  return L.icon({
    iconUrl: require('./img/' + type.valueOf().toLocaleLowerCase() + '_pin.png'),
    iconSize: [40, 40],
    iconAnchor: [0, 0],
    popupAnchor: [20, 0],
  });
}