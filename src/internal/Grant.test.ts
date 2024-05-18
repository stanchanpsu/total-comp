import { Grant } from "./Grant";

describe("Grant", () => {
  let grant: Grant;

  beforeEach(() => {
    grant = new Grant(
      "Test Grant",
      "This is a test grant",
      "GOOG",
      1200,
      12,
      new Date("2023-01-15")
    );
  });

  it("should calculate vested shares correctly", () => {
    grant.calculateVestedShares(new Date("2023-08-15"));
    expect(grant.vestedShares).toBe(800);
    expect(grant.unvestedShares).toBe(400);

    grant.calculateVestedShares(new Date("2024-01-15"));
    expect(grant.vestedShares).toBe(1200);
    expect(grant.unvestedShares).toBe(0);

    grant.calculateVestedShares(new Date("2022-01-15"));
    expect(grant.vestedShares).toBe(0);
    expect(grant.unvestedShares).toBe(1200);
  });
});
