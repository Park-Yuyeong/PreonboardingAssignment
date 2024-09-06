import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Input from "../../../components/common/Input";

describe("Input Component", () => {
  test("label, input 렌더링 테스트", () => {
    render(<Input label="Username" />);

    const labelElement = screen.getByText("Username");
    const inputElement = screen.getByRole("textbox");

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  test("input props 전달 테스트", () => {
    render(<Input placeholder="Enter your name" />);

    const inputElement = screen.getByPlaceholderText("Enter your name");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("placeholder", "Enter your name");
  });
});
