import { EightChar, LunarHour } from "tyme4ts"
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
    rima: string,
}
export const getDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const eightChar = LunarHour.fromYmdHms(year, month, day, hour, minute, second).getEightChar();
    return eightChar
}