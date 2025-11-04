import type { MockLink } from "@apollo/client/testing";
import { vi, beforeEach, afterEach, describe, test, expect } from "vitest";
import type { CreateSavedPoemMutation, CreateSavedPoemMutationVariables, RemoveSavedPoemMutation, RemoveSavedPoemMutationVariables } from "../../../__generated__/graphql";
import { CREATE_SAVED_POEM, REMOVE_SAVED_POEM } from "../save-button.graphql";
import * as AuthContext from "../../../context/use-auth";
import { renderMockProvider } from "../../../utils/test-utils";
import SaveButton from "../save-button";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SaveButton unit tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  })

  afterEach(() => {
    vi.restoreAllMocks();
  })

  const savePoemMock: MockLink.MockedResponse<CreateSavedPoemMutation, CreateSavedPoemMutationVariables> = {
    request: {
      query: CREATE_SAVED_POEM,
      variables: {
        poemId: "p_01"
      }
    },
    result: {
      data: {
        createSavedPoem: {
          id: "s_01",
          poem: {
            id: "p_01"
          },
          author: {
            id: "a_01",
            username: "author_01"
          }
        }
      }
    }
  }

  const removeSavedPoemMock: MockLink.MockedResponse<RemoveSavedPoemMutation, RemoveSavedPoemMutationVariables> = {
    request: {
      query: REMOVE_SAVED_POEM,
      variables: {
        savedPoemId: "s_01"
      }
    },
    result: {
      data: {
        removeSavedPoem: {
          id: "s_01",
          poem: {
            id: "p_01"
          },
          author: {
            id: "a_01",
            username: "author_01"
          }
        }
      }
    }
  }

  const mockSavedPoem: CreateSavedPoemMutation["createSavedPoem"] = {
    id: "s_01",
    poem: {
      id: "p_01"
    },
    author: {
      id: "a_01",
      username: "author_01"
    }
  }

  test("Saves an unsaved poem", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: "author_01",
      userId: "a_01",
      login: vi.fn(),
      logout: vi.fn(),
    });

    renderMockProvider({
      component:
        <SaveButton poemId={"p_01"} savedByCurrentUser={null}>Save</SaveButton>,
      mocks: [savePoemMock]
    });

    const saveButton = await screen.findByTestId("save-button-p_01");
    expect(window.getComputedStyle(saveButton).background).toBe("rgb(220, 226, 220)")
    expect(window.getComputedStyle(saveButton).color).toBe("rgb(24, 28, 24)")

    await userEvent.click(saveButton);
    vi.waitFor(() => {
      expect(window.getComputedStyle(saveButton).background).toBe("rgb(145, 20, 49)")
      expect(window.getComputedStyle(saveButton).color).toBe("rgb(220, 226, 220)")
    })
  })

  test("Unsaves a saved poem", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: "author_01",
      userId: "a_01",
      login: vi.fn(),
      logout: vi.fn(),
    });

    renderMockProvider({
      component:
        <SaveButton poemId={"p_01"} savedByCurrentUser={mockSavedPoem}>Save</SaveButton>,
      mocks: [removeSavedPoemMock]
    });

    const saveButton = await screen.findByTestId("save-button-p_01");
    expect(window.getComputedStyle(saveButton).background).toBe("rgb(145, 20, 49)")
    expect(window.getComputedStyle(saveButton).color).toBe("rgb(220, 226, 220)")

    await userEvent.click(saveButton);
    vi.waitFor(() => {
      expect(window.getComputedStyle(saveButton).background).toBe("rgb(220, 226, 220)")
      expect(window.getComputedStyle(saveButton).color).toBe("rgb(24, 28, 24)")
    })
  })

  test("Fails to save a saved poem without loggin in", async () => {
    renderMockProvider({
      component:
        <SaveButton poemId={"p_01"} savedByCurrentUser={null}>Save</SaveButton>,
      mocks: [savePoemMock]
    });

    const saveButton = await screen.findByTestId("save-button-p_01");
    expect(window.getComputedStyle(saveButton).background).toBe("rgb(220, 226, 220)")
    expect(window.getComputedStyle(saveButton).color).toBe("rgb(24, 28, 24)")

    await userEvent.click(saveButton);
    vi.waitFor(() => {
      expect(window.getComputedStyle(saveButton).background).toBe("rgb(220, 226, 220)")
      expect(window.getComputedStyle(saveButton).color).toBe("rgb(24, 28, 24)")
    })
  })

  test("Fails to unsave a saved poem without loggin in", async () => {
    renderMockProvider({
      component:
        <SaveButton poemId={"p_01"} savedByCurrentUser={null}>Save</SaveButton>,
      mocks: [removeSavedPoemMock]
    });

    const saveButton = await screen.findByTestId("save-button-p_01");
    expect(window.getComputedStyle(saveButton).background).toBe("rgb(220, 226, 220)")
    expect(window.getComputedStyle(saveButton).color).toBe("rgb(24, 28, 24)")

    await userEvent.click(saveButton);
    vi.waitFor(() => {
      expect(window.getComputedStyle(saveButton).background).toBe("rgb(220, 226, 220)")
      expect(window.getComputedStyle(saveButton).color).toBe("rgb(24, 28, 24)")
    })
  })
})
