import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Navbar from '../views/Navbar.vue'
import Login from '../views/Login.vue'
import Create from '../views/Create.vue'
import CreateGroup from '../views/CreateGroup.vue'
import Register from '../views/Register.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/navbar',
    name: 'Navbar',
    component: Navbar
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  },
  {
    path: '/add-group',
    name: 'CreateGroup',
    component: CreateGroup
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');
  // console.log(store.state.isAdmin);
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
