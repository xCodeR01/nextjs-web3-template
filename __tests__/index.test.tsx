import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "@/lib/redux";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const heading = screen.getByRole("heading", {
      name: /Nextjs Template/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
