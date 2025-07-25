import { result } from "./type";
import { getDateByObj, getDateBySiZhu } from "./utils/date";
import { getDunGan } from "./utils/dunGan";
import { getSanChuan } from "./utils/sanChuan";
import { getSiKe } from "./utils/siKe";
import { getTianDiPan } from "./utils/tianDiPan";

// const date = getDateByObj(new Date("2025-07-25 17:25"))
const date = getDateBySiZhu("乙巳", "辛巳", "甲午", "乙亥")
const tianDiPan = getTianDiPan(date)
const siKe = getSiKe(date, tianDiPan)
const dunGan = getDunGan(date, tianDiPan)
const sanChuan = getSanChuan(siKe, tianDiPan)
const result: result = {
    dateInfo: date,
    tiandipan: tianDiPan,
    siKe: siKe,
    dunGan: dunGan
}
console.log(sanChuan)
// console.log(result)