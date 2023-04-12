import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

export function renderWithProviders(ui, { storeOptions, ...renderOptions }) {
  const store = configureStore({ reducer: {}, ...storeOptions });

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
