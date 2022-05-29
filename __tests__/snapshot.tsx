import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "@/lib/redux";
import Home from "@/pages/index";

it("renders homepage unchanged", () => {
  const { container } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(container).toMatchSnapshot();
});
