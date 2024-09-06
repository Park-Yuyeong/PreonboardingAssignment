import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "../../../components/common/Button";

describe("Button Component", () => {
  test("Primary 버튼 스타일링 적용 테스트", () => {
    render(<Button>Click Me</Button>);

    const buttonElement = screen.getByRole("button", {
      name: "Click Me",
    });

    expect(buttonElement).toBeInTheDocument();

    expect(buttonElement).toHaveClass("bg-white text-black");
  });

  test("Secondary 버튼 스타일링 적용 테스트", () => {
    render(<Button priority="secondary">Click Me</Button>);

    const buttonElement = screen.getByRole("button", {
      name: "Click Me",
    });

    expect(buttonElement).toHaveClass("border border-white text-white");
  });
});
