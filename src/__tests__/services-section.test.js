import { screen } from "@testing-library/react";
import { createSlice } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../utils/test-utils";

import { ServicesList } from "../components/ServicesList";
import { DialogsPipeline } from "../components/DialogsPipeline";

/*
 * Services section tests
 *
 * This tests strictly related to the services section,
 * but they also related to dialogs section, which is not a part of services section,
 * because dialogs pipeline may contain invoice level dialogs
 * and as result should not be mixed with services section logic.
 *
 * Dialogs pipeline is a list of dialogs which should be resolved by user one after another.
 * For example, if user tries to "Save and preview" current invoice and invoice has unstaged services,
 * the pipeline should contain "SaveServiceDialog" and "SaveAndPreviewDialog".
 * */

function ServicesSection() {
  return (
    <div>
      <ServicesList />;
      <DialogsPipeline />;
    </div>
  );
}

describe("Services section tests WITHOUT changes in current service", () => {
  let user;
  let storeOptions;

  beforeAll(() => {
    user = userEvent.setup();
  });

  beforeEach(() => {
    const serviceSlice = createSlice({
      name: "services",

      initialState: {
        currentServiceIndex: 1,
        services: [
          {
            description: "Services section design",
            quantity: 1,
            date: "month",
            price: 100,
            currency: "USD",
            amount: null,
          },
          {
            description: "Services section development",
            quantity: 1,
            date: "month",
            price: 100,
            currency: "USD",
            amount: null,
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

  it("On a 'Save' click a current service form should be replaced with a service card", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const form = screen.getByLabelText("Describe a service");
    const submitButton = form.getByLabelText("Save");
    await user.click(submitButton);

    expect(screen.getByLabelText("Describe a service")).not.toBeVisible();
    expect(screen.getAllByLabelText("Service card")).toHaveLength(2);
  });

  it("On a 'Cancel' click a current service form should be replaced with a service card", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const form = screen.getByLabelText("Describe a service");
    const cancelButton = form.getByLabelText("Cancel");
    await user.click(cancelButton);

    expect(screen.getByLabelText("Describe a service")).not.toBeVisible();
    expect(screen.getAllByLabelText("Service card")).toHaveLength(2);
  });

  it("On an 'Edit' click, an edit form should be opened instead of a current card, and a previous form should be replaced with a card", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const card = screen.getAllByLabelText("Service card")[0];
    const actionsButton = card.getByLabelText("Service actions");
    await user.click(actionsButton);

    const actionsPopover = screen.getByLabelText("Service actions popover");
    const editButton = actionsPopover.getByLabelText("Edit a service");
    await user.click(editButton);

    expect(screen.getByLabelText("Describe a service")).toBeVisible();
    expect(screen.getAllByLabelText("Service card")).toHaveLength(1);
  });

  it("On a 'Duplicate' click an edit form should be opend instead of a current card and a previous form should be replaced with a card", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const card = screen.getAllByLabelText("Service card")[0];
    const actionsButton = card.getByLabelText("Service actions");
    await user.click(actionsButton);

    const actionsPopover = screen.getByLabelText("Service actions popover");
    const duplicateButton = actionsPopover.getByLabelText(
      "Duplicate a service"
    );
    await user.click(duplicateButton);

    expect(screen.getByLabelText("Describe a service")).toBeVisible();
    expect(screen.getAllByLabelText("Service card")).toHaveLength(1);
  });

  it("On a 'Delete' click a current service form should be replaced with a service card and a 'Confirm deletion' dialog should be displayed", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const card = screen.getAllByLabelText("Service card")[0];
    const actionsButton = card.getByLabelText("Service actions");
    await user.click(actionsButton);

    const actionsPopover = screen.getByLabelText("Service actions popover");
    const deleteButton = actionsPopover.getByLabelText("Delete a service");
    await user.click(deleteButton);

    expect(screen.getByLabelText("Confirm deletion")).toBeVisible();
  });
});

describe("Services section tests WITH VALID changes in current service", () => {
  let user;
  let storeOptions;

  beforeAll(() => {
    user = userEvent.setup();
  });

  beforeEach(() => {
    const serviceSlice = createSlice({
      name: "services",

      initialState: {
        currentServiceIndex: 1,
        unstagedChanges: {
          description: "Services section development",
          quantity: 1,
          date: "month",
          price: 300,
          currency: "USD",
          amount: null,
        },
        services: [
          {
            description: "Services section design",
            quantity: 1,
            date: "month",
            price: 100,
            currency: "USD",
            amount: null,
          },
          {
            description: "Services section development",
            quantity: 1,
            date: "month",
            price: 100,
            currency: "USD",
            amount: null,
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

  it("On a 'Save' click a 'Confirm save' dialog should be displayed", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const form = screen.getByLabelText("Describe a service");
    const submitButton = form.getByLabelText("Save");
    await user.click(submitButton);

    expect(screen.getByLabelText("Confirm save")).toBeVisible();
  });

  it("On a 'Cancel' click a 'Confirm save' dialog should be displayed", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const form = screen.getByLabelText("Describe a service");
    const cancelButton = form.getByLabelText("Cancel");
    await user.click(cancelButton);

    expect(screen.getByLabelText("Confirm save")).toBeVisible();
  });

  it("On a 'Edit' click a 'Confirm save' dialog should be displayed", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const card = screen.getAllByLabelText("Service card")[0];
    const actionsButton = card.getByLabelText("Service actions");
    await user.click(actionsButton);

    const actionsPopover = screen.getByLabelText("Service actions popover");
    const editButton = actionsPopover.getByLabelText("Edit a service");
    await user.click(editButton);

    expect(screen.getByLabelText("Confirm save")).toBeVisible();
  });

  it("On a 'Duplicate' click a 'Confirm save' dialog should be displayed", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const card = screen.getAllByLabelText("Service card")[0];
    const actionsButton = card.getByLabelText("Service actions");
    await user.click(actionsButton);

    const actionsPopover = screen.getByLabelText("Service actions popover");
    const duplicateButton = actionsPopover.getByLabelText(
      "Duplicate a service"
    );
    await user.click(duplicateButton);

    expect(screen.getByLabelText("Confirm save")).toBeVisible();
  });

  it("On a 'Delete' click a 'Confirm save' dialog should be displayed", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const card = screen.getAllByLabelText("Service card")[0];
    const actionsButton = card.getByLabelText("Service actions");
    await user.click(actionsButton);

    const actionsPopover = screen.getByLabelText("Service actions popover");
    const deleteButton = actionsPopover.getByLabelText("Delete a service");
    await user.click(deleteButton);

    expect(screen.getByLabelText("Confirm save")).toBeVisible();
  });
});

describe("Services section tests WITH INVALID changes in current service", () => {
  let user;
  let storeOptions;

  beforeAll(() => {
    user = userEvent.setup();
  });

  beforeEach(() => {
    const serviceSlice = createSlice({
      name: "services",

      initialState: {
        currentServiceIndex: 1,
        unstagedChanges: {
          description: "",
          quantity: 1,
          date: "month",
          price: 300,
          currency: "USD",
          amount: null,
        },
        services: [
          {
            description: "Services section design",
            quantity: 1,
            date: "month",
            price: 100,
            currency: "USD",
            amount: null,
          },
          {
            description: "Services section development",
            quantity: 1,
            date: "month",
            price: 100,
            currency: "USD",
            amount: null,
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

  it("On a 'Save' click a 'Discard changes' dialog should be displayed", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const form = screen.getByLabelText("Describe a service");
    const submitButton = form.getByLabelText("Save");
    await user.click(submitButton);

    expect(screen.getByLabelText("Discard changes")).toBeVisible();
  });

  it("On a 'Cancel' click a 'Discard changes' dialog should be displayed", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const form = screen.getByLabelText("Describe a service");
    const cancelButton = form.getByLabelText("Cancel");
    await user.click(cancelButton);

    expect(screen.getByLabelText("Discard changes")).toBeVisible();
  });

  it("On a 'Edit' click a 'Discard changes' dialog should be displayed", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const card = screen.getAllByLabelText("Service card")[0];
    const actionsButton = card.getByLabelText("Service actions");
    await user.click(actionsButton);

    const actionsPopover = screen.getByLabelText("Service actions popover");
    const editButton = actionsPopover.getByLabelText("Edit a service");
    await user.click(editButton);

    expect(screen.getByLabelText("Discard changes")).toBeVisible();
  });

  it("On a 'Duplicate' click a 'Discard changes' dialog should be displayed", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const card = screen.getAllByLabelText("Service card")[0];
    const actionsButton = card.getByLabelText("Service actions");
    await user.click(actionsButton);

    const actionsPopover = screen.getByLabelText("Service actions popover");
    const duplicateButton = actionsPopover.getByLabelText(
      "Duplicate a service"
    );
    await user.click(duplicateButton);

    expect(screen.getByLabelText("Discard changes")).toBeVisible();
  });

  it("On a 'Delete' click a 'Discard changes' dialog should be displayed", async () => {
    renderWithProviders(<ServicesSection />, { storeOptions });

    const card = screen.getAllByLabelText("Service card")[0];
    const actionsButton = card.getByLabelText("Service actions");
    await user.click(actionsButton);

    const actionsPopover = screen.getByLabelText("Service actions popover");
    const deleteButton = actionsPopover.getByLabelText("Delete a service");
    await user.click(deleteButton);

    expect(screen.getByLabelText("Discard changes")).toBeVisible();
  });
});
