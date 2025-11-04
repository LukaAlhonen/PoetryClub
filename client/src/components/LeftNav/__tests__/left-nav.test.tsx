import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import * as AuthContext from "../../../context/use-auth";
import { renderMockProvider } from "../../../utils/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LeftNav from "../left-nav";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { MockLink } from "@apollo/client/testing";
import { GET_POEMS } from "../../../pages/Poems/poems.graphql";

const getPoemsMock: MockLink.MockedResponse = {
  request: {
    query: GET_POEMS,
  },
  result: {}
}

describe("LeftNav unit tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  })

  afterEach(() => {
    vi.restoreAllMocks();
  })

  test("Renders left nav while logged out", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
        <LeftNav />
      </MemoryRouter>
    })

    expect(await screen.findByText("Home")).toBeInTheDocument();
    expect(await screen.findByText("Search")).toBeInTheDocument();
    expect(await screen.findByText("Signup")).toBeInTheDocument();
    expect(await screen.findByText("Login")).toBeInTheDocument();
  })

  test("Renders left nav while logged in", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
     user: "author_01",
     userId: "a_01",
     login: vi.fn(),
     logout: vi.fn(),
    })

    renderMockProvider({
      component:
      <MemoryRouter>
        <LeftNav />
      </MemoryRouter>
    })

    expect(await screen.findByText("Home")).toBeInTheDocument();
    expect(await screen.findByText("Search")).toBeInTheDocument();
    expect(await screen.findByText("New Poem")).toBeInTheDocument();
    expect(await screen.findByText("author_01")).toBeInTheDocument();
    expect(await screen.findByText("Logout")).toBeInTheDocument();
  })

  test("visits home page link", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
        <LeftNav />
        <Routes>
          <Route element={<div>Home Page</div>} path={"/"} />
        </Routes>
      </MemoryRouter>
    })

    await userEvent.click(await screen.findByTestId("home-link"))

    expect(await screen.findByText("Home Page")).toBeInTheDocument();
  })

  test("visits search page link", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
        <LeftNav />
        <Routes>
          <Route element={<div>Search Page</div>} path={"/search"} />
          <Route element={<div></div>} path={"/"} />
        </Routes>
      </MemoryRouter>
    })

    await userEvent.click(await screen.findByTestId("search-link"))

    expect(await screen.findByText("Search Page")).toBeInTheDocument();
  })

  test("visits compose poem link", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
     user: "author_01",
     userId: "a_01",
     login: vi.fn(),
     logout: vi.fn(),
    })

    renderMockProvider({
      component:
      <MemoryRouter>
        <LeftNav />
        <Routes>
          <Route element={<div>Compose Page</div>} path={"/compose"} />
          <Route element={<div></div>} path={"/"} />
        </Routes>
      </MemoryRouter>
    })

    await userEvent.click(await screen.findByTestId("compose-link"))

    expect(await screen.findByText("Compose Page")).toBeInTheDocument();
  })

  test("visits profile page link", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
     user: "author_01",
     userId: "a_01",
     login: vi.fn(),
     logout: vi.fn(),
    })

    renderMockProvider({
      component:
      <MemoryRouter>
        <LeftNav />
        <Routes>
          <Route element={<div>Profile Page</div>} path={"/author/:username"} />
          <Route element={<div></div>} path={"/"} />
        </Routes>
      </MemoryRouter>
    })

    await userEvent.click(await screen.findByTestId("profile-link"))

    expect(await screen.findByText("Profile Page")).toBeInTheDocument();
  })

  test("visits log out link", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
     user: "author_01",
     userId: "a_01",
     login: vi.fn(),
     logout: vi.fn(),
    })

    renderMockProvider({
      component:
      <MemoryRouter>
        <LeftNav />
        <Routes>
          <Route element={<div>Home Page</div>} path={"/"} />
        </Routes>
      </MemoryRouter>,
      mocks: [getPoemsMock]
    })

    await userEvent.click(await screen.findByTestId("logout-link"))

    expect(await screen.findByText("Home Page")).toBeInTheDocument();
  })

  test("visits sign up link", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
        <LeftNav />
        <Routes>
          <Route element={<div></div>} path={"/"} />
          <Route element={<div>Signup Page</div>} path={"/signup"} />
        </Routes>
      </MemoryRouter>
    })

    await userEvent.click(await screen.findByTestId("signup-link"))

    expect(await screen.findByText("Signup Page")).toBeInTheDocument();
  })

  test("visits log in link", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
        <LeftNav />
        <Routes>
          <Route element={<div></div>} path={"/"} />
          <Route element={<div>Login Page</div>} path={"/login"} />
        </Routes>
      </MemoryRouter>
    })

    await userEvent.click(await screen.findByTestId("login-link"))

    expect(await screen.findByText("Login Page")).toBeInTheDocument();
  })
})
