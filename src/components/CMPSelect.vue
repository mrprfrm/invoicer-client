<script>
export default {
  props: ["name", "label"],

  setup() {},
};
</script>

<template>
  <div>
    <label
      :for="name"
      class="z-10 absolute -mt-2 text-xs px-0.5 ml-2.5 bg-white"
    >
      {{ label }}
    </label>
    <select
      :name="name"
      :id="name"
      class="text-sm py-3 px-4 border rounded-md w-full"
    >
      <option value="">Select an item</option>
    </select>
  </div>
</template>
