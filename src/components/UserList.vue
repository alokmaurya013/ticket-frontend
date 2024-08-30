<template>
  <div class="user-list max-w-4xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">User Management</h1>

    <table v-if="users.length > 0" class="min-w-full bg-white rounded-lg shadow-md">
      <thead class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <tr>
          <th class="py-3 px-6 text-left">Name</th>
          <th class="py-3 px-6 text-left">Email</th>
          <th class="py-3 px-6 text-center">Update</th>
          <th class="py-3 px-6 text-center">Delete</th>
        </tr>
      </thead>
      <tbody class="text-gray-600 text-sm font-light">
        <tr v-for="user in users" :key="user._id" class="border-b border-gray-200 hover:bg-gray-100">
          <td class="py-3 px-6 text-left">{{ user.name }}</td>
          <td class="py-3 px-6 text-left">{{ user.email }}</td>
          <td class="py-3 px-6 text-center">
            <button @click="openUpdateModal(user)" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Update
            </button>
          </td>
          <td class="py-3 px-6 text-center">
            <button @click="deleteUser(user._id)" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="text-gray-600 text-center">
      <p>No users found.</p>
    </div>

    <!-- Update User Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <span class="absolute top-2 right-2 cursor-pointer text-gray-500 text-xl" @click="closeModal">&times;</span>
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Update User</h2>
        <form @submit.prevent="updateUser">
          <div class="mb-4">
            <label for="name" class="block text-gray-700 font-medium mb-2">Name</label>
            <input v-model="selectedUser.name" type="text" id="name" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
            <input v-model="selectedUser.email" type="email" id="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selectedUser: null,
      showModal: false,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://127.0.0.1:8000/admin/userlist', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        this.users = data.users;
      } catch (error) {
        console.error(error.message);
      }
    },
    openUpdateModal(user) {
      this.selectedUser = { ...user };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async updateUser() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/updateuser/${this.selectedUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.selectedUser),
        });
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        this.closeModal();
        this.fetchUsers();
      } catch (error) {
        console.error(error.message);
      }
    },
    async deleteUser(userId) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/deleteuser/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        this.fetchUsers();
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.user-list {
  padding: 20px;
}

.modal {
  display: block;
}

.modal-content {
  animation: slide-in 0.3s ease-out;
}

@keyframes slide-in {
  from {
    transform: translateY(-10%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
