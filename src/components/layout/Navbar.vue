<template>
  <div class="navbar">
    <nav class="teal darken-1">
      <div class="container">
        <router-link :to="{ name: 'Home'}" class="brand-logo left">Quik Data</router-link>
        <ul class="right" id="menu">
          <li v-if="user">
            <router-link :to="{ name: 'Forms', params : { page_index: 1 }}">DNCA Forms</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{ name: 'SignUp'}">Sign Up</router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{ name: 'Login'}">Login</router-link>
          </li>
          <li v-if="user">
            <a class="dropdown-trigger material-icons" data-target="user-dropdown">account_circle</a>
          </li>
        </ul>
      </div>
      <div id="user-dropdown" class="dropdown-content">
        <ul v-if="user">
          <li>
            <a>{{ user.email }}</a>
          </li>
          <li>
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import ScrollTo from "vue-scrollto";
export default {
  name: "Navbar",
  data() {
    return {
      user: false
    };
  },
  created() {
    firebase.auth.onAuthStateChanged(user => {
      this.user = user;
    });
  },
  mounted() {
    var doc = document.querySelector(".navbar nav .container ul");
    doc.addEventListener(
      "DOMNodeInserted",
      function() {
        var dropdown = document.querySelector(".dropdown-trigger");
        if (dropdown && !M.Dropdown.getInstance(dropdown)) {
          M.Dropdown.init(dropdown, { alignment: "right" });
        }
      },
      false
    );
  },
  methods: {
    logout() {
      firebase.auth.signOut().then(() => {
        this.$router.push({ name: "Login" });
      });
    }
  }
};
</script>

<style>
.navbar .container ul#menu {
  display: flex;
}
.navbar .container ul li a.material-icons {
  display: inline-block;
  vertical-align: middle;
  height: 56px;
  line-height: 56px;
  margin-top: -1px;
}
.navbar .container .dropdown-content {
  top: 56px !important;
  width: auto !important;
  border-radius: 0 0 8px 8px;
}
@media only screen and (min-width: 601px) {
  .navbar .container ul li a.material-icons {
    height: 64px;
    line-height: 64px;
    margin-top: -2px;
  }
  .navbar .container .dropdown-content {
    top: 64px !important;
  }
}
</style>


