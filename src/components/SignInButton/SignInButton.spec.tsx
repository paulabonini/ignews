import { useSession } from "next-auth/client";
import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";

import { SignInButton } from ".";

jest.mock("next-auth/client");

describe("SingInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: "Jhon Doe",
          email: "jhonedoe@example.com",
        },
        expires: "fake-expires",
      },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText("Jhon Doe")).toBeInTheDocument();
  });
});
