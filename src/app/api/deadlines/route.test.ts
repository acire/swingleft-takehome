import { describe, it, expect, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";
import { destroyDB } from "src/db/client";
import { vi } from "vitest";

function buildRequest(params?: Record<string, string>) {
  const url = new URL(`http://localhost/api/deadlines`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  return new NextRequest(url);
}

afterAll(async () => {
  await destroyDB();
});

describe("GET /api/deadlines", () => {
  it("should return all deadlines", async () => {
    const response = await GET(buildRequest());
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(51); // includes DC
    expect(data[0]).toHaveProperty("State");
  });

  it("filters to exact state match", async () => {
    const response = await GET(buildRequest({ state: "California" }));
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(1);
    expect(data[0].State).toBe("California");
  });

  it("filters to partial state match (case insensitive)", async () => {
    const response = await GET(buildRequest({ state: "miss" }));
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(2);
    expect(data.map(d => d.State).sort()).toEqual(["Mississippi", "Missouri"]);
  });

  it("sorts by valid column (asc default)", async () => {
    const response = await GET(buildRequest({ sortBy: "State" }));
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(51);
    expect(data[0].State).toBe("Alabama");
    expect(data[50].State).toBe("Wyoming");
  });

  it("sorts by valid column (desc)", async () => {
    const response = await GET(buildRequest({ sortBy: "State", sortOrder: "desc" }));
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(51);
    expect(data[0].State).toBe("Wyoming");
    expect(data[50].State).toBe("Alabama");
  });

  it("returns 400 for invalid sortBy parameter", async () => {
    const response = await GET(buildRequest({ sortBy: "InvalidColumn" }));
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toContain("Invalid option");
  });

  it("returns 400 for invalid sortOrder parameter", async () => {
    const response = await GET(buildRequest({ sortOrder: "invalid" }));
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toContain("Invalid option");
  });

  it("returns 500 if db fails", async () => {
    const deadlines = await import("src/db/deadlines");
    vi.spyOn(deadlines, "getDeadlines").mockRejectedValue(new Error("Internal server error"));

    const response = await GET(buildRequest());
    expect(response.status).toBe(500);

    vi.restoreAllMocks();
  });
});