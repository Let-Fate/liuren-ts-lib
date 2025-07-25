import { DateInfo } from "./utils/date"

export interface result {
    dateInfo?: DateInfo
    tiandipan?: TianDiPan
    siKe?: SiKe
    sanChuan?: SanChuan
    dunGan?: ShiErGongEx
}
export interface TianDiPan {
    "地盘": ShiErGong,
    "天盘": ShiErGong,
    "天将": ShiErGong
}
export interface SanChuan {
    "初传": string[],
    "中传": string[],
    "末传": string[]
}
export interface SiKe {
    "一课": string[],
    "二课": string[],
    "三课": string[],
    "四课": string[]
}
export interface ShiErGong {
    0: string,
    1: string,
    2: string,
    3: string,
    4: string,
    5: string,
    6: string,
    7: string,
    8: string,
    9: string,
    10: string,
    11: string,
}
export interface ShiErGongEx {
    "子": string,
    "丑": string,
    "寅": string,
    "卯": string,
    "辰": string,
    "巳": string,
    "午": string,
    "未": string,
    "申": string,
    "酉": string,
    "戌": string,
    "亥": string
}