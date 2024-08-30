<template>
  <div class="register-container mx-auto max-w-md p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
    <form @submit.prevent="register">
      <div class="form-group mb-4">
        <label for="name" class="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          v-model="name"
          type="text"
          id="name"
          required
          placeholder="Enter name"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div class="form-group mb-4">
        <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
        <input
          v-model="email"
          type="text"
          id="email"
          required
          placeholder="Enter email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div class="form-group mb-4">
        <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          required
          placeholder="Enter password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div class="form-group mb-4">
        <label for="confirmPassword" class="block text-gray-700 font-semibold mb-2">Confirm Password</label>
        <input
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
          required
          placeholder="Confirm password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
      >
        Register
      </button>
      <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }
      try {
        const response = await fetch('http://127.0.0.1:8000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail || 'Failed to register');
        }
        this.login();
      } catch (error) {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    },
    async login() {
      try {
        const response = await fetch('http://127.0.0.1:8000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail || 'Failed to login');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ email: this.email }));
        window.location.href = '/dashboard';
        window.location.reload();
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
