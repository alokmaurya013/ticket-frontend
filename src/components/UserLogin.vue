<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <input 
            type="email" 
            v-model="email" 
            placeholder="Email" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div class="mb-6">
          <input 
            type="password" 
            v-model="password" 
            placeholder="Password" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button 
          type="submit" 
          class="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
//import { eventBus } from '@/eventBus';

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://127.0.0.1:8000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        })
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail || 'Failed to login');
        }
        const data = await response.json()
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ 'email': this.email }));

        // Reload the page and redirect to the dashboard
       // eventBus.$emit('user-logged-in', data);

        this.$router.push('/dashboard');
      } catch(e) {
        this.error = e.message;
      }
    }
  }
}
</script>

<style scoped>
/* Tailwind CSS is used directly in the template for styling */
</style>
