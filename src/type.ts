export interface result {
    bazi: string,
    date: string,
    dizhuantianjiang: ShiErGongEx
    dizhuantianpan: ShiErGongEx,
    dungan: ShiErGongEx,
    geju: string[],
    kong: string[],
    rima: string,
    sanchuan: SanChuan,
    tiandipan: {
        "地盘": ShiErGong,
        "天盘": ShiErGong,
        "天将": ShiErGong
    }
}

interface SanChuan {
    "初传": string[],
    "中传": string[],
    "末传": string[]
}
interface SiKe {
    "一课": string[],
    "二课": string[],
    "三课": string[],
    "四课": string[]
}
interface ShiErGong {
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
interface ShiErGongEx {
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