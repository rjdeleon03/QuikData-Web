import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/home/Home";
import About from "@/components/about/About";
import SignUp from "@/components/auth/SignUp";
import Login from "@/components/auth/Login";
import Logout from "@/components/auth/Logout";
import Forms from "@/components/forms/Forms";
import SingleForm from "@/components/form/SingleForm";

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
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout
    },
    {
      path: "/forms/:page_index",
      name: "Forms",
      component: Forms
    },
    {
      path: "/forms/:form_id",
      name: "SingleForm",
      component: SingleForm
    }
  ]
});

export default router;
