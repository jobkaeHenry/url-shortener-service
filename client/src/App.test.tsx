import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("타이틀이 존재하는지", () => {
  render(<App />);
  const Title = screen.getByText(/메인페이지/i);
  expect(Title).toBeInTheDocument();
});
