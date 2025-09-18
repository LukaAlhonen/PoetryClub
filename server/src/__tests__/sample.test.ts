import { expect, test, vi } from "vitest";
import { createUser } from "../../script.js";
import prisma from "../../libs/__mocks__/prisma.js";

vi.mock("../../libs/prisma");

test("Create User", async () => {
  const newUser = {
    username: "test1",
    password: "password",
    email: "email1@domain.com",
  };
  prisma.user.create.mockResolvedValue({
    ...newUser,
    id: "1",
    dateJoined: new Date(),
  });
  const user = await createUser(newUser);
  expect(user).toBeDefined();
});
