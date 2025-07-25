import { JiGong } from "src/maps/jiGong"
import { LiuQin, Relation, WuXing } from "src/maps/wuXing"
import { SanChuan, ShiErGong, ShiErGongEx, SiKe, TianDiPan } from "src/type"
import { zeiKe } from "./jiuZongMen/zeiKe"
import { GanZhiYinYang } from "src/maps/ganZhi"

export const getSanChuan = (siKe: SiKe, tiandipan: TianDiPan): SanChuan => {
    let sanChuan: SanChuan = {
        "初传": [],
        "中传": [],
        "末传": [],
        "课体": ""
    }
    // 读取四课
    const ke1_shang = siKe.一课[0][0]
    // 课1下为干 转为寄宫
    const ke1_xia = siKe.一课[0][1]
    const riGan = ke1_xia
    const riJi = JiGong[ke1_xia as keyof typeof JiGong]
    const ke2_shang = siKe.二课[0][0]
    const ke2_xia = siKe.二课[0][1]
    const ke3_shang = siKe.三课[0][0]
    const ke3_xia = siKe.三课[0][1]
    const ke4_shang = siKe.四课[0][0]
    const ke4_xia = siKe.四课[0][1]

    const siKeArray = []
    siKeArray.push(ke1_shang + ke1_xia)
    siKeArray.push(ke2_shang + ke2_xia)
    siKeArray.push(ke3_shang + ke3_xia)
    siKeArray.push(ke4_shang + ke4_xia)
    /**
        *（一）、贼克法
        *四课中的天盘称为上神，地盘称为下神。上神克下神称为克。下神克上神称为贼。
        *方法：①四课中只有一个下贼上直接作为初传，其余中传，末传，皆以前者天盘换到地盘而再推天盘之支。这种形式称为始入课。就是最原始的入课法。
        *②四课中有上克下，但还有一个下贼上的，还是以下贼上作为初传，其余中传，末传，皆以前者天盘换到地盘而再推天盘之支。这种形式称为重审课。
        *③四课中只有一个上克下直接作为初传，其余中传，末传，皆以前者天盘换到地盘而再推天盘之支。这种形式称为元首课。
     */
    let zeiNumber = 0;
    let keNumber = 0;
    let zeiIndexArray = []
    let keIndexArray = []
    for (let i = 0; i < 4; i++) {
        const relation = getGanZhi2Relation(siKeArray[i])
        if (relation == "克") {
            keNumber++
            keIndexArray.push(i)
        };
        if (relation == "贼") {
            zeiNumber++
            zeiIndexArray.push(i)
        }
    }
    // 元首课
    if (keNumber == 1 && zeiNumber == 0) {
        return zeiKe(tiandipan, siKeArray[keIndexArray[0]].substring(0, 1), "元首课")
    }
    // 重审课
    // 不用考虑克数 因为有贼取贼
    if (zeiNumber == 1) {
        return zeiKe(tiandipan, siKeArray[zeiIndexArray[0]].substring(0, 1), "重审课")
    }
    /**
     *（二）、比用法 
     *四课中有两或三课下贼上或仅有上克下的两或三课，则应当取"唯一"与日干俱比为初传。
     *俱比指的是与日干阴阳属性相同。两或三个下贼上发用叫做比用课，
     *仅有上克下两或三个而无下贼上发用时叫做知一课。当与日干阴阳相同的地支存在多个或一个都没，则选用其它方式。
     */
    // 贼多
    if ((zeiNumber == 2 || zeiNumber == 3)) {
        const riGanYinYang = GanZhiYinYang[riGan as keyof typeof GanZhiYinYang]
        const yinYangArray = []
        for (let i = 0; i < zeiIndexArray.length; i++) {
            const ke = siKeArray[zeiIndexArray[i]]
            const shangShen = ke.substring(0, 1)
            const yinYang = GanZhiYinYang[shangShen as keyof typeof GanZhiYinYang]
            if (yinYang == riGanYinYang) {
                yinYangArray.push(shangShen)
            }
        }
        // 二下贼上为比用，二上克下为知一
        if (yinYangArray.length == 1) {
            if (keNumber == 2) {
                return zeiKe(tiandipan, yinYangArray[0], "知一课")
            }
            if (zeiNumber == 2) {
                return zeiKe(tiandipan, yinYangArray[0], "比用课")
            } else {
                return zeiKe(tiandipan, yinYangArray[0], "知一课")
            }
        }
    }
    // 有贼论贼 无贼论克
    if ((keNumber == 2 || keNumber == 3) && zeiNumber == 0) {
        const riGanYinYang = GanZhiYinYang[riGan as keyof typeof GanZhiYinYang]
        const yinYangArray = []
        for (let i = 0; i < keIndexArray.length; i++) {
            const ke = siKeArray[keIndexArray[i]]
            const shangShen = ke.substring(0, 1)
            const yinYang = GanZhiYinYang[shangShen as keyof typeof GanZhiYinYang]
            if (yinYang == riGanYinYang) {
                yinYangArray.push(shangShen)
            }
        }
        // 若只存在一个比和则以贼克法发用
        if (yinYangArray.length == 1) {
            // 二下贼上为比用，二上克下为知一
            if (keNumber == 2) {
                return zeiKe(tiandipan, yinYangArray[0], "知一课")
            } else {
                return zeiKe(tiandipan, yinYangArray[0], "比用课")
            }
        }
    }
    /**
     * 3. 涉害法
     * 法则：当四课中有多处克，且用比用法无法抉择时（如俱比或俱不比），则进入涉害法。此法比较各克神在地盘上“行走”到其本宫所受克的“深度”。
     * 详解：计算方法是从克神所临的天盘宫位，顺数至其地盘本宫，看期间经过了多少个克它的地支，经过多者为“涉害深”，取涉害最深者为初传。
     * 孟仲季：
     * 寅申巳亥
     * 子午卯酉
     * 辰戌丑未
     */
    // 贼优先
    // 涉害课
    if (zeiNumber > 0) {
        for (let i = 0; i < zeiIndexArray.length; i++) {
            const ke = siKeArray[zeiIndexArray[i]]
            const shangShen = ke.substring(0, 1)
            if (shangShen == "寅" || shangShen == "申" || shangShen == "巳" || shangShen == "亥") {
                return zeiKe(tiandipan, shangShen, "见机课")
            }
        }
        for (let i = 0; i < zeiIndexArray.length; i++) {
            const ke = siKeArray[zeiIndexArray[i]]
            const shangShen = ke.substring(0, 1)
            if (shangShen == "子" || shangShen == "午" || shangShen == "卯" || shangShen == "酉") {
                return zeiKe(tiandipan, shangShen, "察微课")
            }
        }
    }
    if (zeiNumber == 0 && keNumber > 0) {
        for (let i = 0; i < keIndexArray.length; i++) {
            const ke = siKeArray[keIndexArray[i]]
            const shangShen = ke.substring(0, 1)
            if (shangShen == "寅" || shangShen == "申" || shangShen == "巳" || shangShen == "亥") {
                return zeiKe(tiandipan, shangShen, "见机课")
            }
        }
        for (let i = 0; i < keIndexArray.length; i++) {
            const ke = siKeArray[keIndexArray[i]]
            const shangShen = ke.substring(0, 1)
            if (shangShen == "子" || shangShen == "午" || shangShen == "卯" || shangShen == "酉") {
                return zeiKe(tiandipan, shangShen, "察微课")
            }
        }
    }
    /**
     * 4. 遥克法
     * 法则：四课之内无克，但四课之外，日干遥克三、四课之神，或三、四课之神遥克日干。取此遥克之神为初传。
     */
    if (keNumber == 0 && zeiNumber == 0) {
        // 先论被克 再论克
        // 即shang 克 xia
        const item1 = ke2_shang + ke1_xia
        const item2 = ke3_shang + ke1_xia
        const item3 = ke4_shang + ke1_xia
        const relation1 = getGanZhi2Relation(item1)
        const relation2 = getGanZhi2Relation(item2)
        const relation3 = getGanZhi2Relation(item3)
        // 只存在一个的情况
        if (relation1 == "克" && relation2 != "克" && relation3 != "克") {
            return zeiKe(tiandipan, ke2_shang, "蒿矢课")
        }
        if (relation2 == "克" && relation1 != "克" && relation3 == "克") {
            return zeiKe(tiandipan, ke3_shang, "蒿矢课")
        }
        if (relation3 == "克" && relation1 != "克" && relation2 != "克") {
            return zeiKe(tiandipan, ke4_shang, "蒿矢课")
        }
        if (relation1 == "贼" && relation2 != "贼" && relation3 != "贼") {
            return zeiKe(tiandipan, ke2_shang, "弹射课")
        }
        if (relation2 == "贼" && relation1 != "贼" && relation3 != "贼") {
            return zeiKe(tiandipan, ke3_shang, "弹射课")
        }
        if (relation3 == "贼" && relation1 != "贼" && relation2 != "贼") {
            return zeiKe(tiandipan, ke4_shang, "弹射课")
        }
        // 存在俩个克
        // 1 2
        if (relation1 == "克" && relation2 == "克" && relation3 != "克") {
            const tong = getTongYinYang(ke2_shang, ke3_shang, riGan)
            if (tong != "") {
                return zeiKe(tiandipan, tong, "蒿矢课")
            }
        }
        // 2 3
        if (relation1 != "克" && relation2 == "克" && relation3 == "克") {
            const tong = getTongYinYang(ke3_shang, ke4_shang, riGan)
            if (tong != "") {
                return zeiKe(tiandipan, tong, "蒿矢课")
            }
        }
        // 1 3
        if (relation1 == "克" && relation2 != "克" && relation3 == "克") {
            const tong = getTongYinYang(ke2_shang, ke4_shang, riGan)
            if (tong != "") {
                return zeiKe(tiandipan, tong, "蒿矢课")
            }
        }
        // 1 2 3
        if (relation1 == "克" && relation2 == "克" && relation3 == "克") {
            // 1 2
            const tong1 = getTongYinYang(ke2_shang, ke3_shang, riGan)
            // 1 3
            const tong2 = getTongYinYang(ke2_shang, ke4_shang, riGan)
            // 2 3
            const tong3 = getTongYinYang(ke3_shang, ke4_shang, riGan)
            // 取唯一一个相同的发用
            if (tong1 == "" && tong2 == "" && tong3 != "") {
                return zeiKe(tiandipan, tong3, "蒿矢课")
            }
            if (tong1 != "" && tong2 == "" && tong3 == "") {
                return zeiKe(tiandipan, tong1, "蒿矢课")
            }
            if (tong1 == "" && tong2 != "" && tong3 == "") {
                return zeiKe(tiandipan, tong2, "蒿矢课")
            }
        }
        // 贼同理
        // 存在俩个贼
        // 1 2
        if (relation1 == "贼" && relation2 == "贼" && relation3 != "贼") {
            const tong = getTongYinYang(ke2_shang, ke3_shang, riGan)
            if (tong != "") {
                return zeiKe(tiandipan, tong, "弹射课")
            }
        }
        // 2 3
        if (relation1 != "贼" && relation2 == "贼" && relation3 == "贼") {
            const tong = getTongYinYang(ke3_shang, ke4_shang, riGan)
            if (tong != "") {
                return zeiKe(tiandipan, tong, "弹射课")
            }
        }
        // 1 3
        if (relation1 == "贼" && relation2 != "贼" && relation3 == "贼") {
            const tong = getTongYinYang(ke2_shang, ke4_shang, riGan)
            if (tong != "") {
                return zeiKe(tiandipan, tong, "弹射课")
            }
        }
        // 1 2 3
        if (relation1 == "贼" && relation2 == "贼" && relation3 == "贼") {
            // 1 2
            const tong1 = getTongYinYang(ke2_shang, ke3_shang, riGan)
            // 1 3
            const tong2 = getTongYinYang(ke2_shang, ke4_shang, riGan)
            // 2 3
            const tong3 = getTongYinYang(ke3_shang, ke4_shang, riGan)
            // 取唯一一个相同的发用
            if (tong1 == "" && tong2 == "" && tong3 != "") {
                return zeiKe(tiandipan, tong3, "弹射课")
            }
            if (tong1 != "" && tong2 == "" && tong3 == "") {
                return zeiKe(tiandipan, tong1, "弹射课")
            }
            if (tong1 == "" && tong2 != "" && tong3 == "") {
                return zeiKe(tiandipan, tong2, "弹射课")
            }
        }
    }

    /**
     * 昴星法
     * 法则：四课无克，且与日干无遥克关系。此时，阳日取天盘“酉”上神为初传；阴日则取地盘“酉”上所临之天盘神为初传。
     */
    if (keNumber == 0 && zeiNumber == 0) {
        const riGanYinYang = GanZhiYinYang[riGan as keyof typeof GanZhiYinYang]
        if (riGanYinYang == "阳") {
            
        } else {
            
        }
    }
    return sanChuan;
}

export const getGanZhi2WuXing = (ganZhi: string) => {
    let result = ""
    for (let i = 0; i < ganZhi.length; i++) {
        result += WuXing[ganZhi[i] as keyof typeof WuXing]
    }
    return result
}
export const getGanZhi2Relation = (ganZhi: string) => {
    const wuxing = getGanZhi2WuXing(ganZhi)
    const relation = Relation[wuxing as keyof typeof Relation]
    return relation
}
export const getLiuQin = (item1: string, item2: string) => {
    const wuxing1 = getGanZhi2WuXing(item1)
    const wuxing2 = getGanZhi2WuXing(item2)
    const relation = Relation[(wuxing1 + wuxing2) as keyof typeof Relation]
    return LiuQin[relation as keyof typeof LiuQin]
}

const getTongYinYang = (item1: string, item2: string, base: string): string => {
    const riGanYinYang = GanZhiYinYang[base as keyof typeof GanZhiYinYang]
    const item1YinYang = GanZhiYinYang[item1 as keyof typeof GanZhiYinYang]
    const item2YinYang = GanZhiYinYang[item2 as keyof typeof GanZhiYinYang]
    if (item1YinYang == riGanYinYang && item2YinYang != riGanYinYang) {
        return item1
    }
    if (item2YinYang == riGanYinYang && item1YinYang != riGanYinYang) {
        return item2
    }
    // 为空则为相同阴阳
    return ""
}