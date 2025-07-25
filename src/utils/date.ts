import { EightChar, LunarHour, SixtyCycle } from "tyme4ts"
import { YiMa } from "src/maps/yiMa";
/**
        "date": "2025年07月25日 10时13分",
        "bazi": "乙巳 癸未 乙未 辛巳",
        "rima": "巳",
        "kong": [
            "辰",
            "巳"
        ]
 */
export interface DateInfo {
    bazi: string,
    date: string,
    kong: string[],
    yima: string,
}
export const getDate = (date: Date): DateInfo => {
    const result: DateInfo = {
        bazi: "",
        date: "",
        kong: [],
        yima: "",
    };
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const eightChar = LunarHour.fromYmdHms(year, month, day, hour, minute, second).getEightChar();

    result.bazi = `${eightChar.getYear} ${eightChar.getMonth} ${eightChar.getDay} ${eightChar.getHour}`
    result.date = `${year}年${month}月${day}日 ${hour}时${minute}分`
    
    const sixtyCycle = SixtyCycle.fromName(eightChar.getDay.toString())
    result.kong = sixtyCycle.getExtraEarthBranches().map(item => item.toString())

    const hourBranch = eightChar.getHour.toString().substring(2) as keyof typeof YiMa
    if (YiMa.hasOwnProperty(hourBranch)) {
        result.yima = YiMa[hourBranch]
    } else {
        result.yima = ""
    }
    return result
}