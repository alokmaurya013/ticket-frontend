<template>
  <div id="app">
    <header class="bg-green-600 p-4">
      <nav class="flex gap-4 justify-center">
        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="text-white hover:text-gray-200"
        >
          Sign In
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/register"
          class="text-white hover:text-gray-200"
        >
          Sign Up
        </router-link>

        <!-- Admin Links -->
        <template v-if="isLoggedIn && isAdmin">
          <router-link
            to="/userlist"
            class="text-white hover:text-gray-200"
          >
            User List
          </router-link>
          <router-link
            to="/ticketlist"
            class="text-white hover:text-gray-200"
          >
            Ticket List
          </router-link>
          <router-link
            to="/login"
            @click="logout"
            class="text-white hover:text-gray-200"
          >
            Logout
          </router-link>
        </template>

        <!-- Normal User Links -->
        <template v-if="isLoggedIn && !isAdmin">
          <router-link
            to="/dashboard"
            class="text-white hover:text-gray-200"
          >
            Dashboard
          </router-link>
          <router-link
            to="/profile"
            class="text-white hover:text-gray-200"
          >
            Profile
          </router-link>
          <router-link
            to="/ticketsubmit"
            class="text-white hover:text-gray-200"
          >
            Book-Ticket
          </router-link>
          <router-link
            to="/usertickets"
            class="text-white hover:text-gray-200"
          >
            Tickets
          </router-link>
          <router-link
            to="/login"
            @click="logout"
            class="text-white hover:text-gray-200"
          >
            Logout
          </router-link>
        </template>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
import { eventBus } from '@/eventBus';
export default {
  
  data() {
    return {
      userEmail: null,
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token");
    },

    isAdmin() {
      return this.userEmail === "admin@gmail.com";
    },
  },
  mounted() {
    if (this.isLoggedIn) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email) {
        this.userEmail = storedUser.email;
      }
    }
    eventBus.$on('user-logged-in', () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      this.userEmail = storedUser ? storedUser.email : null;
    });
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.$router.push("/login").then(() => {
        window.location.reload();
      });
    },
  },
};
</script>

<style scoped>
header {
  @apply bg-green-600 p-4;
}
nav {
  @apply flex gap-4 justify-center;
}
nav a {
  @apply text-white hover:text-gray-200;
}
</style>
