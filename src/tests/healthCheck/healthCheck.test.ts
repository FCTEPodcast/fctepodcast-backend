import request from "supertest";
import { app } from "../../app";

jest.mock("typeorm", () => {
  const original = jest.requireActual("typeorm");
  return {
    ...original,
    AppDataSource: jest.fn().mockImplementation(() => ({
      initialize: jest.fn().mockResolvedValue(true),
      getRepository: jest.fn(),
    })),
  };
});

describe("Health Check", () => {
  it("Deve retornar sucesso caso a api esteja rodando", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty(
      "message",
      "API está funcionando corretamente"
    );
    expect(res.body).toHaveProperty("timestamp");

    expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);
  });
});
