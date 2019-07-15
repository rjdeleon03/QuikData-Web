import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/home/Home";
import SignUp from "@/components/auth/SignUp";
import Login from "@/components/auth/Login";
import Logout from "@/components/auth/Logout";
import Forms from "@/components/forms/Forms";
import Print from "@/components/print/Print";
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
      path: "/forms/:page_index?",
      name: "Forms",
      component: Forms
    },
    {
      path: "/form/:form_id",
      name: "SingleForm",
      component: SingleForm
    },
    {
      path: "/print/:form_id",
      name: "Print",
      component: Print
    }
  ]
});

export default router;
