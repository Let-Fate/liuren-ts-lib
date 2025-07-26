import { getLiuRenByDate } from "../src";

describe("getLiuRenByDate", () => {
    it("should return the liuren by date", () => {
        const result = getLiuRenByDate(new Date());
        console.log(result);
    });
});