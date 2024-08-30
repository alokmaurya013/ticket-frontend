<template>
  <div id="homepage" class="flex flex-col min-h-screen">
    <header class="bg-green-500 text-white py-6">
      <h1 class="text-3xl font-bold">Welcome to Ticket Support System</h1>
    </header>
    <main class="flex-grow px-6 py-12">
      <section class="description mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">About Us</h2>
        <p class="text-lg text-gray-600 leading-relaxed">
          Welcome to our Ticket Support System, where we offer a streamlined way to get support for various issues.
          Whether you're experiencing technical difficulties or need assistance with our services, our platform is here
          to help you.
        </p>
        <p class="text-lg text-gray-600 leading-relaxed mt-4">
          Our easy-to-use interface allows you to submit support tickets, track their status, and communicate with our
          support team. As a registered user, you can manage your tickets and update your profile seamlessly.
        </p>
      </section>
      <section class="call-to-action">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Get Started</h2>
        <p class="text-lg text-gray-600">
          To book a support ticket, please 
          <router-link to="/login" class="text-blue-500 hover:text-blue-700 underline">log in</router-link> or 
          <router-link to="/signup" class="text-blue-500 hover:text-blue-700 underline">sign up</router-link> for an account.
        </p>
      </section>
    </main>
    <footer class="bg-gray-100 text-gray-600 py-4 text-center">
      <p>&copy; 2024 Ticket Support System. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
/* Additional custom styles*/
</style>
