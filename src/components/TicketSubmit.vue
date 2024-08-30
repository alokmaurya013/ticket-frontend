<template>
  <div class="ticket-submit max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Buy a Ticket</h1>
    <form @submit.prevent="submitTicket" class="space-y-6">
      <div class="form-group">
        <label for="title" class="block text-gray-700 font-medium mb-2">Title</label>
        <input
          v-model="title"
          type="text"
          id="title"
          required
          class="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>
      <div class="form-group">
        <label for="category" class="block text-gray-700 font-medium mb-2">Category</label>
        <select
          v-model="category"
          id="category"
          class="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
        >
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
          <option value="General">General</option>
        </select>
      </div>
      <div class="form-group">
        <label for="description" class="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          v-model="description"
          id="description"
          rows="4"
          required
          class="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Buy Ticket
      </button>
    </form>
    <!-- Success and error messages -->
    <p v-if="successMessage" class="mt-4 text-green-600">{{ successMessage }}</p>
    <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      category: '',
      description: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async submitTicket() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: this.title,
            description: this.description,
            category: this.category,
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to submit ticket');
        }
        this.successMessage = 'Ticket submitted successfully!';
        this.title = '';
        this.description = '';
        this.category = '';
      } catch (e) {
        this.errorMessage = e.message;
      }
    },
  },
};
</script>

<style scoped>
/* Styling is handled using Tailwind CSS classes directly in the template */
</style>
