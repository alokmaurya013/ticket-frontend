<!-- Add this comment to disable the linting rule -->
<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="dashboard max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">Welcome to the Dashboard</h1>
    <p class="text-gray-600 mb-6">
      Here you can track your support tickets and manage your profile.
    </p>
    <div class="ticket-summary p-4 bg-gray-100 rounded-lg">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Your Tickets</h2>
      <!-- Example summary, populate this dynamically -->
      <p class="text-gray-700 mb-2">
        <span class="font-bold">Open Tickets:</span> 5
      </p>
      <p class="text-gray-700">
        <span class="font-bold">Resolved Tickets:</span> 10
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tickets: [],
    };
  },
  created() {
    // Fetch user's tickets
  },
};
</script>

<style scoped>
/* TailwindCSS styles are applied directly in the template */
</style>
