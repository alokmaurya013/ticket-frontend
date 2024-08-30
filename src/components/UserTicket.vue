<template>
  <div class="user-tickets container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Your Tickets</h1>
    <div v-if="loading" class="text-center">
      <span class="text-blue-500">Loading...</span>
    </div>
    <ul v-if="tickets.length && !loading" class="space-y-4">
      <li v-for="ticket in tickets" :key="ticket.id" class="bg-white p-4 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold">{{ ticket.title }} <span class="text-sm text-gray-500">({{ ticket.status }})</span></h3>
        <p class="text-gray-700">{{ ticket.description }}</p>
        <button @click="openCancelConfirmation(ticket.id)" class="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
          Cancel
        </button>
      </li>
    </ul>
    <p v-else-if="!loading" class="text-gray-500">No tickets found.</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <!-- Cancel Confirmation Modal -->
    <div v-if="showCancelConfirmation" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <p class="mb-4">Are you sure you want to cancel this ticket?</p>
        <div class="flex justify-end">
          <button @click="cancelTicket(selectedTicketId)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 mr-2">
            Yes
          </button>
          <button @click="closeCancelConfirmation" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300">
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tickets: [],
      loading: false,
      error: null,
      showCancelConfirmation: false,
      selectedTicketId: null,
    };
  },
  methods: {
    async fetchTickets() {
      this.loading = true;
      this.error = null;
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://127.0.0.1:8000/usertickets', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const data = await response.json();
        this.tickets = data.tickets;
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
    openCancelConfirmation(id) {
      this.selectedTicketId = id;
      this.showCancelConfirmation = true;
    },
    closeCancelConfirmation() {
      this.showCancelConfirmation = false;
    },
    async cancelTicket(id) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://127.0.0.1:8000/tickets/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to cancel ticket');
        }
        this.tickets = this.tickets.filter(ticket => ticket.id !== id);
        this.closeCancelConfirmation();
      } catch (e) {
        this.error = e.message;
      }
    },
  },
  created() {
    this.fetchTickets();
  },
};
</script>

<style scoped>
.user-tickets {
  max-width: 600px;
}
</style>
