import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";

describe("Login component", () => {
  it("should render login form correctly", async () => {
    // Mocking the navigate function from react-router-dom
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    // Render the Login component
    const { getByLabelText, getByText } = render(<Login />);

    // Fill in the form inputs
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "Ann@gmail.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "ann123" },
    });
    fireEvent.click(getByLabelText("Admin"));

    // Submit the form
    fireEvent.click(getByText("Login"));

    // Wait for the asynchronous tasks to complete
    await waitFor(() => {
      // Check if navigate was called with the correct path
      expect(mockNavigate).toHaveBeenCalledWith("/hello-teacher");
    });
  });
});
