import { screen } from "@testing-library/react";
import { createSlice } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../utils/test-utils";

import { ServiceForm } from "../components/ServiceForm";

describe("Emply service form fill tests without initial state", () => {
  let user;
  let storeOptions;

  beforeAll(() => {
    user = userEvent.setup();
  });

  beforeEach(() => {
    const serviceSlice = createSlice({
      name: "services",

      initialState: {
        services: [],
      },
    });

    storeOptions = {
      reducer: {
        services: serviceSlice.reducer,
      },
    };
  });

  it("If all fields are set, 'Save' button should be enabled", async () => {
    /**
     * Date and currency has default values, so they are not required fields.
     */

    renderWithProviders(<ServiceForm />, { storeOptions });

    user.type(
      screen.getByLabelText("Service description"),
      "Services section design"
    );
    user.type(screen.getByLabelText("Service quantity"), "1");
    user.type(screen.getByLabelText("Service price"), "1");
    user.type(screen.getByLabelText("Service amount"), "1");

    expect(screen.getByLabelText("Save")).toBeEnabled();
  });

  it("If all fields but amout are set, 'Save' should be enabled", async () => {
    /**
     * Amount is not required field, and without it fourm still
     * should allow user to save service instance
     */

    renderWithProviders(<ServiceForm />, { storeOptions });

    user.type(
      screen.getByLabelText("Service description"),
      "Services section design"
    );
    user.type(screen.getByLabelText("Service quantity"), "1");
    user.type(screen.getByLabelText("Service price"), "1");

    expect(screen.getByLabelText("Save")).toBeEnabled();
  });

  it("If only description is set, 'Save' button should be disabled", async () => {
    renderWithProviders(<ServiceForm />, { storeOptions });
    user.type(
      screen.getByLabelText("Service description"),
      "Services section design"
    );
    expect(screen.getByLabelText("Save")).toBeDisabled();
  });

  it("If only quantity is set, 'Save' button should be disabled", async () => {
    renderWithProviders(<ServiceForm />, { storeOptions });

    user.type(screen.getByLabelText("Service quantity"), "1");

    expect(screen.getByLabelText("Save")).toBeEnabled();
  });

  it("If only price is set, 'Save' button should be disabled", async () => {
    renderWithProviders(<ServiceForm />, { storeOptions });

    user.type(screen.getByLabelText("Service price"), "1");

    expect(screen.getByLabelText("Save")).toBeEnabled();
  });

  it("If only amount is set, 'Save' button should be disabled", async () => {
    renderWithProviders(<ServiceForm />, { storeOptions });

    user.type(screen.getByLabelText("Service amount"), "1");

    expect(screen.getByLabelText("Save")).toBeEnabled();
  });
});
