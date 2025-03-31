import { expect } from "chai";
import { getPagination } from "./index";

describe("index.ts Functions", () => {
  it("should correctly display first page details", () => {
    const result = getPagination({ page: 1, limit: 10 }, 10, 134);

    expect(result).to.have.property("page", 1);
    expect(result).to.have.property("limit", 10);
    expect(result).to.have.property("count", 10);
    expect(result).to.have.property("total_pages", 14);
    expect(result).to.have.property("total_records", 134);
    expect(result).to.have.property("has_previous", false);
    expect(result).to.have.property("has_next", true);
  });

  it("should correctly display last page details", () => {
    const result = getPagination({ page: 14, limit: 10 }, 4, 134);

    expect(result).to.have.property("page", 14);
    expect(result).to.have.property("limit", 10);
    expect(result).to.have.property("count", 4);
    expect(result).to.have.property("total_pages", 14);
    expect(result).to.have.property("total_records", 134);
    expect(result).to.have.property("has_previous", true);
    expect(result).to.have.property("has_next", false);
  });
});
