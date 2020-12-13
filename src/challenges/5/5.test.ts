import {
  findSeat,
  getColumn,
  getHighestSeatId,
  getRow,
  getSeatId,
  passes,
} from "./";

describe("challenge 5", () => {
  it("should get the row ", () => {
    expect(getRow(["F", "B", "F", "B", "B", "F", "F"])).toBe(44);
    expect(getRow("BFFFBBF".split(""))).toBe(70);
    expect(getRow(["F", "F", "F", "B", "B", "B", "F"])).toBe(14);
    expect(getRow(["B", "B", "F", "F", "B", "B", "F"])).toBe(102);
  });

  it("should get the column ", () => {
    expect(getColumn("BFFFBBFRRR".split("").slice(7, 10))).toBe(7);
    expect(getColumn("FFFBBBFRRR".split("").slice(7, 10))).toBe(7);
    expect(getColumn("BBFFBBFRLL".split("").slice(7, 10))).toBe(4);
  });

  it("should get the seatId ", () => {
    expect(getSeatId("BFFFBBFRRR")).toBe(567);
    expect(getSeatId("FFFBBBFRRR")).toBe(119);
    expect(getSeatId("BBFFBBFRLL")).toBe(820);
  });

  it("should highest seatId ", () => {
    expect(getHighestSeatId(["BBFFBBFRLL", "FFFBBBFRRR", "BFFFBBFRRR"])).toBe(
      820
    );
  });

  it("should show available seat ", () => {
    expect(findSeat(passes)).toBe(599);
  });
});
