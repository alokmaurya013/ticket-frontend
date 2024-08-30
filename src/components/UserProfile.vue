<template>
  <div class="profile max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">User Profile</h1>
    <div v-if="user" class="space-y-4">
      <p class="text-gray-700">
        <strong>Name:</strong> {{ user.name }}
      </p>
      <p class="text-gray-700">
        <strong>Email:</strong> {{ user.email }}
      </p>
      <button
        @click="showUpdateProfile = true"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Profile
      </button>
    </div>
    <p v-else class="text-gray-500">Loading...</p>
    
    <!-- Modal for updating profile -->
    <div v-if="showUpdateProfile" class="modal fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div class="modal-content bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Update Profile</h2>
        <form @submit.prevent="updateProfile" class="space-y-4">
          <div class="form-group">
            <label for="name" class="block text-gray-600">Name</label>
            <input
              v-model="name"
              type="text"
              id="name"
              required
              class="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div class="form-group">
            <label for="email" class="block text-gray-600">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              class="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="submit"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Update Profile
            </button>
            <button
              type="button"
              @click="showUpdateProfile = false"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
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
      user: null,
      showUpdateProfile: false,
      name: '',
      email: '',
    };
  },
  methods: {
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        this.user = data;
        this.name = data.name;
        this.email = data.email;
      } catch (error) {
        console.error(error.message);
      }
    },
    async updateProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/user/profile/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        this.showUpdateProfile = false;
        this.fetchUserProfile();
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  created() {
    this.fetchUserProfile();
  },
};
</script>

<style scoped>
/* The styling is handled using Tailwind CSS classes directly in the template */
</style>
