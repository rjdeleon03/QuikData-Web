import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/home/Home";
import About from "@/components/about/About";
import SignUp from "@/components/signup/SignUp";

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
    }
  ]
});

export default router;
