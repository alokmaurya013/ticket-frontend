import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from '../components/UserLogin.vue'
import UserDashboard from '../components/UserDashboard.vue'
import UserProfile from '../components/UserProfile.vue'
import UserRegister from '@/components/UserRegister.vue'
import TicketSubmit from '@/components/TicketSubmit.vue'
import HomePage from '@/components/HomePage.vue'
import TicketList from '@/components/TicketList.vue'
import UserTicket from '@/components/UserTicket.vue'
import UserList from '@/components/UserList.vue'

const routes = [
    { path: '/', component: HomePage },
    { path: '/dashboard', component: UserDashboard },
    { path: '/profile', component: UserProfile },
    { path: '/register', component: UserRegister },
    { path: '/login', component: UserLogin },
    { path: '/ticketsubmit', component: TicketSubmit },
    { path: '/ticketlist', component:TicketList }, 
    { path: '/usertickets', component:UserTicket }, 
    { path: '/userlist', component:UserList },     
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
