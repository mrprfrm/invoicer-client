<script>
import TextInput from "../components/TextInput.vue";
import DateInput from "../components/DateInput.vue";
import CMPSelect from "../components/CMPSelect.vue";

export default {
  components: { TextInput, DateInput, CMPSelect },
  setup() {},
};
</script>

<template>
  <div class="flex flex-col px-4 py-8">
    <form class="flex flex-col space-y-6" action="">
      <h1 class="text-xl font-bold mb-6">Invoice</h1>
      <fieldset id="invoice-fields" class="space-y-4">
        <TextInput name="invoice-name" label="Name"></TextInput>
        <DateInput name="invoice-date" label="Date"></DateInput>
      </fieldset>

      <div class="flex flex-row items-center justify-between">
        <h2 class="text-xl font-bold">New contract</h2>
        <button
          class="p-1 text-base font-bold rounded-md focus:ring-2 ring-blue-600 outline-none branded-text"
        >
          Choose contract
        </button>
      </div>

      <fieldset id="contract-fields" class="space-y-4">
        <TextInput name="contract-name" label="Name"></TextInput>
        <DateInput name="contract-date" label="Date"></DateInput>
        <CMPSelect name="contract-client" label="Client"></CMPSelect>
        <CMPSelect name="contract-contractor" label="Contractor"></CMPSelect>
      </fieldset>

      <div id="invoice-services" class="space-y-4">
        <h2 class="text-xl font-bold">Goods and services</h2>
        <div class="services__description">
          <span>There is no added goods or services yet.</span>
          <span class="flex flex-row items-center">
            Do you want to
            <button
              id="add-service"
              class="p-1 ml-1 text-base font-bold rounded-md focus:ring-2 ring-blue-600 outline-none branded-text"
            >
              Add new item
            </button>
            ?
          </span>
        </div>
      </div>

      <div
        id="invoice-buttons"
        class="flex flex-row items-center justify-end space-x-2"
      >
        <button id="invoice-cancel" type="button" class="btn">Cancel</button>
        <button
          id="invoice-save"
          type="submit"
          class="btn text-white branded-bg branded-border"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
