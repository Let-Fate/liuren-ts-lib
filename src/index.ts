import { getDate } from "./utils/date";
import { getSiKe } from "./utils/siKe";
import { getTianDiPan } from "./utils/tianDiPan";

const date = getDate(new Date())
const tianDiPan = getTianDiPan(date)
const siKe = getSiKe(date, tianDiPan)
console.log(siKe)