import { screen } from "@testing-library/react";
import { createSlice } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "test-utils";

import { ServicesList } from "../components/ServicesList";

/*
 * This test suite is testing the ServicesList component.
 * The ServicesList is a component rendered based on the state of the services slice of the store.
 * Also it can modify the state of the services slice of the store adding new services.
 * All the logic of editing and deleting services is available on the ServiceCard component level.
 * */

describe("Services list tests WITHOUT initial state set", () => {
  let storeOptions;

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

  it("A new service form should be displayed for invoices with an empty services list", async () => {
    renderWithProviders(<ServicesList />, { storeOptions });
    expect(screen.getByLabelText("Describe a service")).toBeVisible();
  });

  it("The '+ add item' button should NOT be displayed for invoices with an empty services list", async () => {
    renderWithProviders(<ServicesList />, { storeOptions });
    expect(screen.queryByLabelText("Add a service")).not.toBeInTheDocument();
  });
});

describe("Services list tests WITH initial state set", () => {
  let user;
  let storeOptions;

  beforeAll(() => {
    user = userEvent.setup();
  });

  beforeEach(() => {
    const serviceSlice = createSlice({
      name: "services",

      initialState: {
        services: [
          {
            id: "1",
            name: "Service 1",
            price: 100,
            quantity: 1,
          },
        ],
      },
    });

    storeOptions = {
      reducer: {
        services: serviceSlice.reducer,
      },
    };
  });

  it("A service card should be displayed for invoices with a services list", async () => {
    renderWithProviders(<ServicesList />, { storeOptions });
    expect(screen.queryAllByLabelText("Service card")).toHaveLength(1);
  });

  it("A new service form should NOT be displayed for invoices with a services list", async () => {
    renderWithProviders(<ServicesList />, { storeOptions });
    expect(screen.queryByLabelText("Describe a service")).not.toBeVisible();
  });

  it("The '+ add item' button should be displayed for invoices with a services list", async () => {
    renderWithProviders(<ServicesList />, { storeOptions });
    expect(screen.getByLabelText("Add a service")).toBeVisible();
  });

  it("On click of the '+ add item' button, a new service form should be displayed", async () => {
    renderWithProviders(<ServicesList />, { storeOptions });
    const addServiceButton = screen.getByLabelText("Add a service");
    user.click(addServiceButton);
    expect(screen.getByLabelText("Describe a service")).toBeVisible();
  });

  it("On click of the '+ add item' button, an existing service card should be displayed", async () => {
    renderWithProviders(<ServicesList />, { storeOptions });
    const addServiceButton = screen.getByLabelText("Add a service");
    user.click(addServiceButton);
    expect(screen.queryAllByLabelText("Service card")).toHaveLength(1);
  });

  it("On click of the '+ add item' button, a the `+ add item` button should NOT be displayed", async () => {
    renderWithProviders(<ServicesList />, { storeOptions });
    const addServiceButton = screen.getByLabelText("Add a service");
    user.click(addServiceButton);
    expect(screen.queryByLabelText("Add a service")).not.toBeInTheDocument();
  });
});
