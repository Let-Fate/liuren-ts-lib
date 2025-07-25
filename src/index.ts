import { result } from "./type";
import { getDate } from "./utils/date";
import { getDunGan } from "./utils/dunGan";
import { getSiKe } from "./utils/siKe";
import { getTianDiPan } from "./utils/tianDiPan";

const date = getDate(new Date())
const tianDiPan = getTianDiPan(date)
const siKe = getSiKe(date, tianDiPan)
const dunGan = getDunGan(date,tianDiPan)
const result: result = {
    dateInfo: date,
    tiandipan: tianDiPan,
    siKe: siKe,
    dunGan: dunGan
}
console.log(result)