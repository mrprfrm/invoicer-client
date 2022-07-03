<script>
export default {
  props: ["name", "label"],

  setup() {},
};
</script>

<template>
  <div class="flex flex-col">
    <label
      :for="name"
      class="z-10 absolute -mt-2 text-xs px-0.5 ml-2.5 bg-white"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      :name="name"
      type="date"
      class="text-sm py-3 px-4 border rounded-md"
    />
  </div>
</template>
