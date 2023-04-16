import { createSlice } from "@reduxjs/toolkit";

export const serviceSlice = createSlice({
  name: "services",

  initialState: {
    errors: {},
    services: [],
    currentServiceIndex: null,
    unstagedChanges: null,
    changesValid: false,
  },

  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },

    addService: (state) => {
      state.services.push({});
      state.unstagedChanges = {};
      state.currentServiceIndex = state.services.length - 1;
    },

    duplicateService: (state, action) => {
      const service = state.services[action.payload];
      state.services.push(service);
      state.unstagedChanges = service;
      state.currentServiceIndex = state.services.length - 1;
    },

    deleteService: (state, action) => {
      state.services.pop(action.payload);
    },

    saveChanges: (state) => {
      state.services[currentServiceIndex] = unstagedChanges;
      state.currentServiceIndex = null;
      state.unstagedChanges = null;
    },

    discardChanges: (state) => {
      if (state.unstagedChanges === {}) {
        state.services.pop(state.currentServiceIndex);
      }
      state.currentServiceIndex = null;
      state.unstagedChanges = null;
    },

    validateChanges: (state) => {
      for (let name in state.unstagedChanges) {
        if (state.unstagedChanges[name] === "") {
          errors[name] = `The ${name} field is required.`;
        }
      }
    },
  },
});
