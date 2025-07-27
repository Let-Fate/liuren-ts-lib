import { result } from "./type";
import { getDateByObj, getDateBySiZhu } from "./utils/date";
import { getDunGan } from "./utils/dunGan";
import { fillSanChuan, getSanChuan } from "./utils/sanChuan";
import { getSiKe } from "./utils/siKe";
import { getTianDiPan } from "./utils/tianDiPan";
export const getLiuRenByDate = (time: Date) => {
    const date = getDateByObj(time)
    const riGan = date.bazi.split(" ")[2].substring(0, 1)
    const tianDiPan = getTianDiPan(date)
    const siKe = getSiKe(date, tianDiPan)
    const dunGan = getDunGan(date, tianDiPan)
    const sanChuan = fillSanChuan(getSanChuan(siKe, tianDiPan), tianDiPan, dunGan, riGan)
    const result: result = {
        dateInfo: date,
        tiandipan: tianDiPan,
        siKe: siKe,
        dunGan: dunGan,
        sanChuan: sanChuan
    }
    return result
}
export const getLiuRenBySiZhu = (year: string, month: string, day: string, hour: string) => {
    const date = getDateBySiZhu(year, month, day, hour)
    const riGan = date.bazi.split(" ")[2].substring(0, 1)
    const tianDiPan = getTianDiPan(date)
    const siKe = getSiKe(date, tianDiPan)
    const dunGan = getDunGan(date, tianDiPan)
    const sanChuan = fillSanChuan(getSanChuan(siKe, tianDiPan), tianDiPan, dunGan, riGan)
    const result: result = {
        dateInfo: date,
        tiandipan: tianDiPan,
        siKe: siKe,
        dunGan: dunGan,
        sanChuan: sanChuan
    }
    return result
}