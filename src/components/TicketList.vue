<template>
  <div class="ticket-list max-w-4xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">All Tickets</h1>

    <ul v-if="tickets.length" class="space-y-6">
      <li v-for="ticket in tickets" :key="ticket._id" class="bg-white p-4 rounded-lg shadow-md">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold text-gray-800">{{ ticket.title }} 
            <span class="text-sm font-medium text-gray-500">({{ ticket.status }})</span>
          </h3>
          <div class="flex space-x-4">
            <button
              @click="openStatusModal(ticket)"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Update Status
            </button>
            <button
              @click="openCancelConfirmation(ticket._id)"
              class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
        <p class="text-gray-700 mt-2">{{ ticket.description }}</p>
      </li>
    </ul>
    <p v-else class="text-gray-600">No tickets found.</p>

    <!-- Status Update Modal -->
    <div v-if="showStatusModal" class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <span class="close absolute top-2 right-2 cursor-pointer text-gray-500" @click="closeStatusModal">&times;</span>
        <h2 class="text-2xl font-semibold mb-4">Update Ticket Status</h2>
        <select v-model="selectedStatus" class="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 mb-4">
          <option value="open">Open</option>
          <option value="inprogress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <div class="flex justify-end">
          <button
            @click="submitStatusUpdate"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div v-if="showCancelConfirmation" class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <p class="text-xl font-semibold mb-4">Are you sure you want to cancel this ticket?</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="cancelTicket(selectedTicketId)"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Yes
          </button>
          <button
            @click="closeCancelConfirmation"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
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
      error: null,
      loading: false,
      showStatusModal: false,
      showCancelConfirmation: false,
      selectedTicket: null,
      selectedStatus: 'open',
      selectedTicketId: null,
    };
  },
  methods: {
    async fetchTickets() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('http://127.0.0.1:8000/admin/alltickets', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    openStatusModal(ticket) {
      this.selectedTicket = ticket;
      this.selectedStatus = ticket.status;
      this.showStatusModal = true;
    },
    closeStatusModal() {
      this.showStatusModal = false;
    },
    async submitStatusUpdate() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/updatestatus/${this.selectedTicket._id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: this.selectedStatus }),
        });
        if (!response.ok) {
          throw new Error('Failed to update ticket status');
        }
        this.closeStatusModal();
        this.fetchTickets();
      } catch (e) {
        this.error = e.message;
      }
    },
    openCancelConfirmation(ticketId) {
      this.selectedTicketId = ticketId;
      this.showCancelConfirmation = true;
    },
    closeCancelConfirmation() {
      this.showCancelConfirmation = false;
    },
    async cancelTicket(ticketId) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/cancel/${ticketId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to cancel ticket');
        }
        this.closeCancelConfirmation();
        this.fetchTickets();
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
.modal {
  display: block;
  position: fixed;
  z-index: 50;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
