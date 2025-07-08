import request from "supertest";
import { app } from "../../app";

jest.mock("../../config/typeorm/DataSource", () => ({
  AppDataSource: {
    initialize: jest.fn().mockResolvedValue(true),
    // Se você usa outros métodos como destroy, pode mockar aqui também
    destroy: jest.fn().mockResolvedValue(true),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let server: any;

beforeAll((done) => {
  server = app.listen(0, done); // usa porta dinâmica
});

afterAll((done) => {
  server.close(done); // fecha o servidor para Jest finalizar
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
