import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/home/Home";
import About from "@/components/about/About";
import SignUp from "@/components/auth/SignUp";
import Login from "@/components/auth/Login";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});

export default router;
