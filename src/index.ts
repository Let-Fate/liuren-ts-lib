import { getDate } from "./utils/date";
import { getTianDiPan } from "./utils/tianDiPan";

const date = getDate(new Date())
const tianDiPan = getTianDiPan(date)
console.log(tianDiPan)