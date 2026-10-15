const request = require("supertest");
const app = require("../src/app");
const { resetData } = require("../src/data/products");

beforeEach(function () {
  resetData();
});

describe("GET /products", function () {
  test("returns 200 and all products", async function () {
    // Arrange - seed data loaded by resetData()

    // Act
    const response = await request(app).get("/products");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(2);
  });
});

describe("GET /products/:id", function () {
  test("returns 200 and the product when id exists", async function () {
    // Act
    const response = await request(app).get("/products/1");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Laptop");
  });

  test("returns 404 when product does not exist", async function () {
    // Act
    const response = await request(app).get("/products/99");

    // Assert
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("NOT_FOUND");
  });

  test("returns 400 when id is not a number", async function () {
    // Act
    const response = await request(app).get("/products/abc");

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("INVALID_ID");
  });
});